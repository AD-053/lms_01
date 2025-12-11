import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaImage, FaEye, FaEyeSlash, FaUserTag, FaGraduationCap } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    FullName: '',
    UserName: '',
    Email: '',
    Gender: 'male',
    Password: '',
    confirmPassword: '',
    PhoneNumber: '',
    Role: 'learner',
    ProfileImage: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      setFormData({ ...formData, ProfileImage: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.Password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.ProfileImage) {
      toast.error('Profile image is required');
      return;
    }

    setLoading(true);

    const data = new FormData();
    data.append('FullName', formData.FullName);
    data.append('UserName', formData.UserName);
    data.append('Email', formData.Email);
    data.append('Gender', formData.Gender);
    data.append('Password', formData.Password);
    data.append('PhoneNumber', formData.PhoneNumber);
    data.append('Role', formData.Role);
    data.append('ProfileImage', formData.ProfileImage);

    const result = await register(data);
    setLoading(false);

    if (result.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-500 via-purple-500 to-primary-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Home Link */}
        <Link to="/" className="flex items-center justify-center mb-6 text-white hover:text-gray-200 transition">
          <FaGraduationCap className="text-3xl mr-2" />
          <span className="text-xl font-bold">Back to Home</span>
        </Link>
        
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join our learning platform today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="label">
                  <FaUser className="inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="FullName"
                  value={formData.FullName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="label">
                  <FaUser className="inline mr-2" />
                  Username
                </label>
                <input
                  type="text"
                  name="UserName"
                  value={formData.UserName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="johndoe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <FaEnvelope className="inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="Email"
                  value={formData.Email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="label">
                  <FaPhone className="inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="PhoneNumber"
                  value={formData.PhoneNumber}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="01XXXXXXXXX"
                  pattern="01[3-9]\d{8}"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="label">Gender</label>
                <select
                  name="Gender"
                  value={formData.Gender}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Role */}
              <div>
                <label className="label">
                  <FaUserTag className="inline mr-2" />
                  Role
                </label>
                <select
                  name="Role"
                  value={formData.Role}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="learner">Learner</option>
                  <option value="instructor">Instructor</option>
                </select>
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <FaLock className="inline mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    className="input-field pr-10"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="label">
                  <FaLock className="inline mr-2" />
                  Confirm Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="label">
                <FaImage className="inline mr-2" />
                Profile Image
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex-1 cursor-pointer">
                  <div className="input-field flex items-center justify-center">
                    <span className="text-gray-500">
                      {formData.ProfileImage ? formData.ProfileImage.name : 'Choose a file...'}
                    </span>
                  </div>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    required
                  />
                </label>
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-primary-300"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-secondary-600 hover:text-secondary-700">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
