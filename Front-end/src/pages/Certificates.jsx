import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { FaCertificate, FaDownload, FaEye, FaCalendarAlt, FaChalkboardTeacher } from 'react-icons/fa';
import { certificateAPI } from '../services/api';
import toast from 'react-hot-toast';

const Certificates = () => {
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await certificateAPI.getMyCertificates();
      setCertificates(response.data.data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      toast.error('Failed to load certificates');
    } finally {
      setLoading(false);
    }
  };

  const handleViewCertificate = (certificateID) => {
    navigate(`/certificate/${certificateID}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-gray-600">Loading certificates...</div>
        </div>
      </Layout>
    );
  }

  if (certificates.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">My Certificates</h1>

          <div className="card text-center py-16">
            <FaCertificate className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-4">No certificates earned yet</p>
            <p className="text-gray-400">
              Complete courses with 80%+ video progress, all MCQs completed, and 60%+ average score to earn certificates
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <FaCertificate className="text-purple-600" />
            My Certificates
          </h1>
          <p className="text-gray-600">
            You have earned {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-purple-100"
            >
              {/* Course Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-600 to-violet-700">
                {cert.courseID?.courseImage ? (
                  <img
                    src={cert.courseID.courseImage}
                    alt={cert.courseID.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaCertificate className="text-6xl text-white opacity-50" />
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg line-clamp-2">
                    {cert.courseID?.title || 'Course'}
                  </h3>
                </div>
              </div>

              {/* Certificate Details */}
              <div className="p-5">
                <div className="space-y-3 mb-4">
                  {/* Instructor */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaChalkboardTeacher className="text-purple-600" />
                    <span className="font-medium">
                      {cert.courseID?.owner?.FullName || 'Instructor'}
                    </span>
                  </div>

                  {/* Issue Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FaCalendarAlt className="text-purple-600" />
                    <span>
                      Issued: {new Date(cert.issuedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>

                  {/* Scores */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                      <div className="text-xs text-green-700 font-medium mb-1">Average Score</div>
                      <div className="text-2xl font-bold text-green-800">
                        {cert.averageScore?.toFixed(1) || 0}%
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                      <div className="text-xs text-blue-700 font-medium mb-1">Video Progress</div>
                      <div className="text-2xl font-bold text-blue-800">
                        {cert.videoCompletionPercentage?.toFixed(1) || 0}%
                      </div>
                    </div>
                  </div>

                  {/* Certificate Code */}
                  <div className="bg-gray-50 rounded-lg p-2 mt-3">
                    <div className="text-xs text-gray-500 mb-1">Certificate Code</div>
                    <div className="text-xs font-mono text-gray-700 break-all">
                      {cert.certificateCode}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewCertificate(cert._id)}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-violet-700 text-white py-2.5 rounded-lg font-semibold hover:from-purple-700 hover:to-violet-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <FaEye />
                    View
                  </button>
                  <button
                    onClick={() => handleViewCertificate(cert._id)}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white py-2.5 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <FaDownload />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Certificates;
