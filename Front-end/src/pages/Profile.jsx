import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaUserTag, FaWallet } from 'react-icons/fa';

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getUserProfile(id);
      setProfile(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load profile');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-500"></div>
        </div>
      </Layout>
    );
  }

  if (!profile) {
    return (
      <Layout>
        <div className="text-center py-16">
          <p className="text-gray-500 text-xl">Profile not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Profile Image */}
            <img
              src={profile.ProfileImage || 'https://via.placeholder.com/200'}
              alt={profile.FullName}
              className="w-40 h-40 rounded-full object-cover border-4 border-primary-300 shadow-lg"
            />

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {profile.FullName}
              </h1>
              <p className="text-xl text-gray-600 mb-4">@{profile.UserName}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start text-gray-700">
                  <FaEnvelope className="mr-3 text-primary-500" />
                  <span>{profile.Email}</span>
                </div>

                {profile.PhoneNumber && (
                  <div className="flex items-center justify-center md:justify-start text-gray-700">
                    <FaPhone className="mr-3 text-primary-500" />
                    <span>{profile.PhoneNumber}</span>
                  </div>
                )}

                <div className="flex items-center justify-center md:justify-start text-gray-700">
                  <FaUserTag className="mr-3 text-primary-500" />
                  <span className="capitalize">{profile.Role}</span>
                </div>

                <div className="flex items-center justify-center md:justify-start text-gray-700">
                  <FaWallet className="mr-3 text-green-500" />
                  <span className="font-semibold">Balance: ৳{profile.balance || 0}</span>
                </div>
              </div>

              <div className="mt-6 inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-semibold">
                Gender: {profile.Gender}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
