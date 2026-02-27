import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useState, useEffect } from 'react';
import { courseAPI, certificateAPI, adminAPI } from '../services/api';
import toast from 'react-hot-toast';
import {
  FaWallet,
  FaBook,
  FaCertificate,
  FaChartLine,
  FaUserGraduate,
  FaPlus,
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchDashboardStats();
  }, [user?.Role]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      if (user?.Role === 'learner') {
        await fetchLearnerStats();
      } else if (user?.Role === 'instructor') {
        await fetchInstructorStats();
      } else if (user?.Role === 'admin') {
        await fetchAdminStats();
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      toast.error('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const fetchLearnerStats = async () => {
    try {
      const [enrolledRes, certificatesRes] = await Promise.all([
        courseAPI.getEnrolledCourses(),
        certificateAPI.getMyCertificates()
      ]);

      const enrolledCount = enrolledRes.data.data?.length || 0;
      const certificatesCount = certificatesRes.data.data?.length || 0;

      setStats([
        {
          title: 'Account Balance',
          value: `৳${user?.balance || 0}`,
          icon: FaWallet,
          color: 'from-green-400 to-green-600',
          link: '/bank-setup',
        },
        {
          title: 'Enrolled Courses',
          value: enrolledCount,
          icon: FaBook,
          color: 'from-blue-400 to-blue-600',
          link: '/my-courses',
        },
        {
          title: 'Certificates',
          value: certificatesCount,
          icon: FaCertificate,
          color: 'from-purple-400 to-purple-600',
          link: '/certificates',
        },
        {
          title: 'Browse Courses',
          value: 'Explore',
          icon: FaUserGraduate,
          color: 'from-pink-400 to-pink-600',
          link: '/courses',
        },
      ]);
    } catch (error) {
      console.error('Error fetching learner stats:', error);
      setDefaultLearnerStats();
    }
  };

  const fetchInstructorStats = async () => {
    try {
      const coursesRes = await courseAPI.getInstructorCourses();
      const courses = coursesRes.data.data || [];
      const coursesCount = courses.length;
      
      // Calculate total students from all instructor courses
      const totalStudents = courses.reduce((sum, course) => sum + (course.totalEnrolled || 0), 0);

      setStats([
        {
          title: 'Account Balance',
          value: `৳${user?.balance || 0}`,
          icon: FaWallet,
          color: 'from-green-400 to-green-600',
          link: '/bank-setup',
        },
        {
          title: 'My Courses',
          value: coursesCount,
          icon: FaBook,
          color: 'from-blue-400 to-blue-600',
          link: '/instructor/my-courses',
        },
        {
          title: 'Total Students',
          value: totalStudents,
          icon: FaUserGraduate,
          color: 'from-purple-400 to-purple-600',
          link: '/instructor/students',
        },
        {
          title: 'Add Course',
          value: 'Create',
          icon: FaPlus,
          color: 'from-pink-400 to-pink-600',
          link: '/instructor/add-course',
        },
      ]);
    } catch (error) {
      console.error('Error fetching instructor stats:', error);
      setDefaultInstructorStats();
    }
  };

  const fetchAdminStats = async () => {
    try {
      const [coursesRes, pendingEnrollmentsRes, certificatesRes] = await Promise.all([
        courseAPI.getAllCourses(),
        adminAPI.getPendingEnrollments(),
        certificateAPI.getPendingRequests()
      ]);

      const totalCourses = coursesRes.data.data?.length || 0;
      const pendingApprovals = pendingEnrollmentsRes.data.data?.length || 0;
      const certificatesIssued = certificatesRes.data.data?.length || 0;

      setStats([
        {
          title: 'Account Balance',
          value: `৳${user?.balance || 0}`,
          icon: FaWallet,
          color: 'from-green-400 to-green-600',
          link: '/bank-setup',
        },
        {
          title: 'Total Courses',
          value: totalCourses,
          icon: FaBook,
          color: 'from-blue-400 to-blue-600',
          link: '/admin/courses',
        },
        {
          title: 'Pending Approvals',
          value: pendingApprovals,
          icon: FaChartLine,
          color: 'from-red-400 to-red-600',
          link: '/admin/approve-enrollments',
        },
        {
          title: 'Certificates Pending',
          value: certificatesIssued,
          icon: FaCertificate,
          color: 'from-purple-400 to-purple-600',
          link: '/admin/issue-certificates',
        },
      ]);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      setDefaultAdminStats();
    }
  };

  const setDefaultLearnerStats = () => {
    setStats([
      {
        title: 'Account Balance',
        value: `৳${user?.balance || 0}`,
        icon: FaWallet,
        color: 'from-green-400 to-green-600',
        link: '/bank-setup',
      },
      {
        title: 'Enrolled Courses',
        value: '0',
        icon: FaBook,
        color: 'from-blue-400 to-blue-600',
        link: '/my-courses',
      },
      {
        title: 'Certificates',
        value: '0',
        icon: FaCertificate,
        color: 'from-purple-400 to-purple-600',
        link: '/certificates',
      },
      {
        title: 'Browse Courses',
        value: 'Explore',
        icon: FaUserGraduate,
        color: 'from-pink-400 to-pink-600',
        link: '/courses',
      },
    ]);
  };

  const setDefaultInstructorStats = () => {
    setStats([
      {
        title: 'Account Balance',
        value: `৳${user?.balance || 0}`,
        icon: FaWallet,
        color: 'from-green-400 to-green-600',
        link: '/bank-setup',
      },
      {
        title: 'My Courses',
        value: '0',
        icon: FaBook,
        color: 'from-blue-400 to-blue-600',
        link: '/instructor/my-courses',
      },
      {
        title: 'Total Students',
        value: '0',
        icon: FaUserGraduate,
        color: 'from-purple-400 to-purple-600',
        link: '/instructor/students',
      },
      {
        title: 'Add Course',
        value: 'Create',
        icon: FaPlus,
        color: 'from-pink-400 to-pink-600',
        link: '/instructor/add-course',
      },
    ]);
  };

  const setDefaultAdminStats = () => {
    setStats([
      {
        title: 'Account Balance',
        value: `৳${user?.balance || 0}`,
        icon: FaWallet,
        color: 'from-green-400 to-green-600',
        link: '/bank-setup',
      },
      {
        title: 'Total Courses',
        value: '0',
        icon: FaBook,
        color: 'from-blue-400 to-blue-600',
        link: '/admin/courses',
      },
      {
        title: 'Pending Approvals',
        value: '0',
        icon: FaChartLine,
        color: 'from-red-400 to-red-600',
        link: '/admin/approve-enrollments',
      },
      {
        title: 'Certificates Pending',
        value: '0',
        icon: FaCertificate,
        color: 'from-purple-400 to-purple-600',
        link: '/admin/issue-certificates',
      },
    ]);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.FullName}!
          </h1>
          <p className="text-gray-600 text-lg">
            {user?.Role === 'learner' && 'Continue your learning journey'}
            {user?.Role === 'instructor' && 'Manage your courses and students'}
            {user?.Role === 'admin' && 'Manage the platform'}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Link
                    key={index}
                    to={stat.link}
                    className="card hover:scale-105 transition-transform duration-300"
                  >
                    <div className={`flex items-center justify-between`}>
                      <div>
                        <p className="text-gray-600 text-sm font-semibold mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {stat.value}
                        </p>
                      </div>
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                      >
                        <Icon className="text-white text-2xl" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bank Account Warning */}
            {!user?.accountNumber && (
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-lg shadow">
                <div className="flex items-center">
                  <FaWallet className="text-yellow-600 text-3xl mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-1">
                      Bank Account Not Set Up
                    </h3>
                    <p className="text-yellow-700 mb-3">
                      Please set up your bank account to enable transactions.
                    </p>
                    <Link
                      to="/bank-setup"
                      className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition"
                    >
                      Set Up Now
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {user?.Role === 'learner' && (
                  <>
                    <Link
                      to="/courses"
                      className="btn-primary text-center"
                    >
                      Browse All Courses
                    </Link>
                    <Link
                      to="/my-courses"
                      className="btn-outline text-center"
                    >
                      My Enrolled Courses
                    </Link>
                    <Link
                      to="/bank-setup"
                      className="btn-secondary text-center"
                    >
                      Manage Balance
                    </Link>
                  </>
                )}
                {user?.Role === 'instructor' && (
                  <>
                    <Link
                      to="/instructor/add-course"
                      className="btn-primary text-center"
                    >
                      Create New Course
                    </Link>
                    <Link
                      to="/instructor/my-courses"
                      className="btn-outline text-center"
                    >
                      Manage My Courses
                    </Link>
                    <Link
                      to="/bank-setup"
                      className="btn-secondary text-center"
                    >
                      View Earnings
                    </Link>
                  </>
                )}
                {user?.Role === 'admin' && (
                  <>
                    <Link
                      to="/admin/approve-courses"
                      className="btn-primary text-center"
                    >
                      Approve Courses
                    </Link>
                    <Link
                      to="/admin/approve-enrollments"
                      className="btn-outline text-center"
                    >
                      Approve Enrollments
                    </Link>
                    <Link
                      to="/admin/issue-certificates"
                      className="btn-secondary text-center"
                    >
                      Issue Certificates
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
