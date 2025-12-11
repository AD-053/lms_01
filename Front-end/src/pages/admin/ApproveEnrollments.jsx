import { useState } from 'react';
import Layout from '../../components/Layout';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';

const ApproveEnrollments = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Mock data - in production, fetch from backend
  const mockEnrollments = [
    {
      _id: '1',
      courseID: 'course1',
      courseTitle: 'Web Development Bootcamp',
      learnerID: 'learner1',
      learnerName: 'John Doe',
      price: 5000,
      transactionID: 'txn123',
      paymentStatus: 'pending',
    },
  ];

  const handleApprove = async (enrollment) => {
    if (!window.confirm(`Approve enrollment for ${enrollment.learnerName}?`)) {
      return;
    }

    setLoading(true);
    try {
      await adminAPI.approveEnrollment({
        courseID: enrollment.courseID,
        learnerID: enrollment.learnerID,
        transactionID: enrollment.transactionID,
      });
      toast.success('Enrollment approved successfully!');
      // Remove from list
      setEnrollments(enrollments.filter((e) => e._id !== enrollment._id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to approve enrollment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Approve Enrollments
        </h1>

        {mockEnrollments.length > 0 ? (
          <div className="space-y-4">
            {mockEnrollments.map((enrollment) => (
              <div key={enrollment._id} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {enrollment.courseTitle}
                    </h3>
                    <p className="text-gray-600">Student: {enrollment.learnerName}</p>
                    <p className="text-gray-600 flex items-center mt-2">
                      <FaMoneyBillWave className="mr-2 text-green-500" />
                      Amount: ৳{enrollment.price}
                    </p>
                  </div>
                  <button
                    onClick={() => handleApprove(enrollment)}
                    disabled={loading}
                    className="btn-primary disabled:opacity-50"
                  >
                    <FaCheckCircle className="inline mr-2" />
                    Approve
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-xl">No pending enrollments</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ApproveEnrollments;
