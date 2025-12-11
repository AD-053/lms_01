import Layout from '../components/Layout';
import { FaCertificate } from 'react-icons/fa';

const Certificates = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Certificates</h1>

        <div className="card text-center py-16">
          <FaCertificate className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-xl mb-4">No certificates earned yet</p>
          <p className="text-gray-400">
            Complete courses with 80%+ progress to earn certificates
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Certificates;
