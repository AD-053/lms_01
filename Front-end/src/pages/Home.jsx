import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaCertificate, FaUsers, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FaGraduationCap className="text-4xl text-primary-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                LMS Platform
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-primary-600 font-semibold transition"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-purple-600 to-secondary-600 text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FaGraduationCap className="text-8xl mx-auto mb-6 animate-bounce" />
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
              Welcome to LMS Platform
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Your gateway to unlimited learning opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4">
                Get Started
                <FaArrowRight className="inline ml-2" />
              </Link>
              <Link to="/login" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Platform?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <FaBook className="text-4xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">5 Courses</h3>
              <p className="text-gray-600">
                Carefully curated courses across various domains
              </p>
            </div>

            <div className="card text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-4">
                <FaUsers className="text-4xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Instructors</h3>
              <p className="text-gray-600">
                Learn from industry professionals
              </p>
            </div>

            <div className="card text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <FaCertificate className="text-4xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Certificates</h3>
              <p className="text-gray-600">
                Earn recognized certificates upon completion
              </p>
            </div>

            <div className="card text-center hover:scale-105 transition-transform">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center mx-auto mb-4">
                <FaGraduationCap className="text-4xl text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Self-Paced</h3>
              <p className="text-gray-600">
                Learn at your own pace, anytime, anywhere
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Register & Set Up</h3>
              <p className="text-gray-600">
                Create your account and set up your bank details for transactions
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Choose & Enroll</h3>
              <p className="text-gray-600">
                Browse courses and enroll in the ones that interest you
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary-500 text-white text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Learn & Earn</h3>
              <p className="text-gray-600">
                Complete courses and earn certificates to showcase your skills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-primary-100">
            Join thousands of learners already on their journey
          </p>
          <Link to="/register" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 py-4 inline-block">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaGraduationCap className="text-4xl mx-auto mb-4" />
          <p className="text-gray-400">
            © 2025 LMS Platform. Built with ❤️ for Web Technology Project
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
