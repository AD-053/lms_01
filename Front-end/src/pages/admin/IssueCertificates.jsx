import { useState } from 'react';
import Layout from '../../components/Layout';
import { adminAPI } from '../../services/api';
import toast from 'react-hot-toast';
import { FaCertificate } from 'react-icons/fa';

const IssueCertificates = () => {
  const [loading, setLoading] = useState(false);

  // Mock completed enrollments
  const mockCompletions = [];

  const handleIssue = async (enrollment) => {
    if (!window.confirm(`Issue certificate for ${enrollment.learnerName}?`)) {
      return;
    }

    setLoading(true);
    try {
      await adminAPI.issueCertificate({
        courseID: enrollment.courseID,
        learnerID: enrollment.learnerID,
      });
      toast.success('Certificate issued successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to issue certificate');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Issue Certificates
        </h1>

        {mockCompletions.length > 0 ? (
          <div className="space-y-4">
            {mockCompletions.map((enrollment) => (
              <div key={enrollment._id} className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {enrollment.courseTitle}
                    </h3>
                    <p className="text-gray-600">Student: {enrollment.learnerName}</p>
                    <p className="text-green-600 font-semibold mt-2">
                      Progress: {enrollment.progress}%
                    </p>
                  </div>
                  <button
                    onClick={() => handleIssue(enrollment)}
                    disabled={loading}
                    className="btn-primary disabled:opacity-50"
                  >
                    <FaCertificate className="inline mr-2" />
                    Issue Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <p className="text-gray-500 text-xl">
              No students eligible for certificates
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default IssueCertificates;
