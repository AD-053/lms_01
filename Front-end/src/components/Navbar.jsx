import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaGraduationCap, FaUser, FaBell, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { useState } from 'react';

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="mr-4 text-gray-600 hover:text-primary-600 lg:hidden"
            >
              <FaBars className="w-6 h-6" />
            </button>
            <Link to="/" className="flex items-center space-x-2">
              <FaGraduationCap className="text-4xl text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                LMS Platform
              </span>
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-primary-600 transition">
              <FaBell className="w-5 h-5" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 focus:outline-none"
              >
                <img
                  src={user?.ProfileImage || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-primary-400 object-cover"
                />
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-700">{user?.FullName}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.Role}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                  <Link
                    to={`/profile/${user?._id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 transition"
                    onClick={() => setShowDropdown(false)}
                  >
                    <FaUser className="inline mr-2" />
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <FaSignOutAlt className="inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
