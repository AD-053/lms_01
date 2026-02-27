import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaBook, 
  FaCertificate, 
  FaUsers, 
  FaArrowRight, 
  FaClock,
  FaTrophy,
  FaStar,
  FaLightbulb,
  FaChartLine
} from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <FaGraduationCap className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                LMS Platform
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all transform hover:scale-105 shadow-md"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-primary-600 font-semibold transition-colors px-4 py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all transform hover:scale-105 shadow-md"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm mb-6 border border-gray-100">
              <FaStar className="text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-gray-700">Trusted by thousands of learners</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Learn Today,
              <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                Lead Tomorrow
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Access world-class courses, earn certificates, and advance your career with our comprehensive learning platform.
            </p>
            
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link 
                  to="/register" 
                  className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  Start Learning Free
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  to="/courses" 
                  className="bg-white hover:bg-gray-50 text-gray-900 font-semibold text-lg px-8 py-4 rounded-xl border-2 border-gray-200 transition-all shadow-md"
                >
                  Browse Courses
                </Link>
              </div>
            )}
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600">5+</div>
                <div className="text-sm text-gray-600 mt-1">Courses</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600">100%</div>
                <div className="text-sm text-gray-600 mt-1">Quality</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary-600">24/7</div>
                <div className="text-sm text-gray-600 mt-1">Access</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in your learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaBook className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Courses</h3>
              <p className="text-gray-600 leading-relaxed">
                Carefully curated courses designed by industry experts across various domains
              </p>
            </div>

            <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaClock className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Learn Anytime</h3>
              <p className="text-gray-600 leading-relaxed">
                Study at your own pace with lifetime access to course materials
              </p>
            </div>

            <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaCertificate className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Earn Certificates</h3>
              <p className="text-gray-600 leading-relaxed">
                Get recognized certificates upon completion to boost your career
              </p>
            </div>

            <div className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-primary-200 transition-all duration-300">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FaUsers className="text-3xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry professionals with real-world experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Unlock Your Potential with Modern Learning
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our platform provides everything you need to master new skills and advance your career in today's competitive world.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <FaLightbulb className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Interactive Learning</h3>
                    <p className="text-gray-600">Engage with course materials through videos, quizzes, and hands-on projects.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary-100 flex items-center justify-center flex-shrink-0">
                    <FaChartLine className="text-secondary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Track Your Progress</h3>
                    <p className="text-gray-600">Monitor your learning journey with detailed progress tracking and analytics.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <FaTrophy className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Achievement System</h3>
                    <p className="text-gray-600">Earn certificates and showcase your accomplishments to employers.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-3xl p-12 text-white shadow-2xl">
                <div className="space-y-8">
                  <div>
                    <div className="text-5xl font-bold mb-2">5+</div>
                    <div className="text-primary-100">Premium Courses Available</div>
                  </div>
                  <div className="h-px bg-white opacity-20"></div>
                  <div>
                    <div className="text-5xl font-bold mb-2">∞</div>
                    <div className="text-primary-100">Lifetime Course Access</div>
                  </div>
                  <div className="h-px bg-white opacity-20"></div>
                  <div>
                    <div className="text-5xl font-bold mb-2">100%</div>
                    <div className="text-primary-100">Completion Certificates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to start your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector Lines */}
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"></div>
            
            <div className="text-center relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Create Account</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign up for free and set up your profile with bank details for secure transactions
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Choose Course</h3>
              <p className="text-gray-600 leading-relaxed">
                Browse our catalog and enroll in courses that match your goals and interests
              </p>
            </div>

            <div className="text-center relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-3xl font-bold flex items-center justify-center mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Start Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Complete courses, pass exams, and earn certificates to advance your career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaGraduationCap className="text-6xl text-white mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-10 text-primary-100 leading-relaxed">
            Join our community of learners and unlock your full potential today
          </p>
          {!user ? (
            <Link 
              to="/register" 
              className="inline-flex items-center bg-white text-primary-600 hover:bg-gray-50 font-semibold text-lg px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl"
            >
              Create Free Account
              <FaArrowRight className="ml-2" />
            </Link>
          ) : (
            <Link 
              to="/courses" 
              className="inline-flex items-center bg-white text-primary-600 hover:bg-gray-50 font-semibold text-lg px-10 py-4 rounded-xl transition-all transform hover:scale-105 shadow-xl"
            >
              Explore Courses
              <FaArrowRight className="ml-2" />
            </Link>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <FaGraduationCap className="text-2xl text-white" />
              </div>
              <span className="text-2xl font-bold">LMS Platform</span>
            </div>
            <p className="text-gray-400 mb-6 text-center">
              Empowering learners worldwide with quality education
            </p>
            <div className="border-t border-gray-800 pt-6 w-full text-center">
              <p className="text-gray-500 text-sm">
                © 2025 LMS Platform. Built for Web Technology Project
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
