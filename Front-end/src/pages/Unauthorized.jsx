import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
        <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Unauthorized</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access this page.
        </p>
        <div className="space-y-3">
          <Link to="/dashboard" className="btn-primary inline-block w-full">
            Go to Dashboard
          </Link>
          <Link to="/" className="btn-outline inline-block w-full">
            <FaHome className="inline mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
