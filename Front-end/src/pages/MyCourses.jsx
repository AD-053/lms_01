import Layout from '../components/Layout';
import { FaBook, FaSpinner } from 'react-icons/fa';

const MyCourses = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Courses</h1>

        <div className="card text-center py-16">
          <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl mb-4">No enrolled courses yet</p>
          <p className="text-gray-400">
            Browse available courses and enroll to start learning
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default MyCourses;
