import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import { FaBook, FaSpinner } from 'react-icons/fa';
import { courseAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      let response;
      // Instructors see their created courses, learners see enrolled courses
      if (user?.Role === 'instructor' || user?.Role === 'admin') {
        response = await courseAPI.getInstructorCourses();
      } else {
        response = await courseAPI.getEnrolledCourses();
      }
      const coursesData = response.data.data || [];
      setCourses(coursesData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load your courses');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <FaSpinner className="animate-spin text-5xl text-primary-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          {user?.Role === 'instructor' || user?.Role === 'admin' ? 'My Created Courses' : 'My Courses'}
        </h1>

        {courses.length === 0 ? (
          <div className="card text-center py-16">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-4">
              {user?.Role === 'instructor' || user?.Role === 'admin' 
                ? 'No courses created yet' 
                : 'No enrolled courses yet'}
            </p>
            <p className="text-gray-400 mb-6">
              {user?.Role === 'instructor' || user?.Role === 'admin'
                ? 'Start creating courses to share your knowledge'
                : 'Browse available courses and enroll to start learning'}
            </p>
            <Link
              to={user?.Role === 'instructor' ? '/instructor/add-course' : '/courses'}
              className="btn-primary inline-block"
            >
              {user?.Role === 'instructor' || user?.Role === 'admin' ? 'Create Course' : 'Browse Courses'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MyCourses;
