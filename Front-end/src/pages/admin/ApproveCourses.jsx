import { useState } from 'react';
import Layout from '../../components/Layout';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

const ApproveCourses = () => {
  const [loading, setLoading] = useState(false);

  // Mock pending courses
  const mockCourses = [];

  const handleApprove = async (course) => {
    const payment = prompt('Enter course launch payment amount:');
    if (!payment || parseFloat(payment) <= 0) {
      toast.error('Invalid payment amount');
      return;
    }

    setLoading(true);
    try {
      await adminAPI.approveCourse({
        courseID: course._id,
        courseLanchPayment: parseFloat(payment),
      });
      toast.success('Course approved successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Approve Courses
        </h1>

        {mockCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockCourses.map((course) => (
              <div key={course._id} className="card">
                <img
                  src={course.courseImage}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <p className="text-primary-600 font-bold text-xl mb-4">
                  ৳{course.price}
                </p>
                <button
                  onClick={() => handleApprove(course)}
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  <FaCheckCircle className="inline mr-2" />
                  Approve & Pay Instructor
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-xl">No pending courses</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ApproveCourses;
