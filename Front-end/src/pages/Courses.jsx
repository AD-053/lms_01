import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import CourseCard from '../components/CourseCard';
import { FaSearch, FaFilter } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, available, pending

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [searchTerm, filter, courses]);

  const fetchCourses = async () => {
    try {
      // Since there's no getAllCourses endpoint, we'll use a mock or create sample data
      // In production, you'd need to add this endpoint to the backend
      
      // Mock data for demonstration
      const mockCourses = [
        {
          _id: '1',
          title: 'Web Development Bootcamp',
          description: 'Learn HTML, CSS, JavaScript, React, Node.js and MongoDB',
          price: 5000,
          courseImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500',
          status: 'available',
          isActive: true,
          totalEnrolled: 245,
        },
        {
          _id: '2',
          title: 'Data Science with Python',
          description: 'Master Python, Pandas, NumPy, Matplotlib, and Machine Learning',
          price: 6000,
          courseImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
          status: 'available',
          isActive: true,
          totalEnrolled: 189,
        },
        {
          _id: '3',
          title: 'Mobile App Development',
          description: 'Build iOS and Android apps with React Native',
          price: 5500,
          courseImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500',
          status: 'available',
          isActive: true,
          totalEnrolled: 156,
        },
        {
          _id: '4',
          title: 'Digital Marketing Masterclass',
          description: 'SEO, Social Media, Email Marketing, and Analytics',
          price: 4000,
          courseImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500',
          status: 'available',
          isActive: true,
          totalEnrolled: 312,
        },
        {
          _id: '5',
          title: 'Graphic Design Fundamentals',
          description: 'Learn Adobe Photoshop, Illustrator, and design principles',
          price: 4500,
          courseImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500',
          status: 'available',
          isActive: true,
          totalEnrolled: 198,
        },
      ];

      setCourses(mockCourses);
      setFilteredCourses(mockCourses);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter((course) => course.status === filter);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(filtered);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Explore Courses
          </h1>
          <p className="text-gray-600 text-lg">
            Choose from our selection of 5 amazing courses
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Courses</option>
              <option value="available">Available</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No courses found</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Courses;
