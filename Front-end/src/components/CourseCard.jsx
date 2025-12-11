import { FaClock, FaUsers, FaStar, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id}`} className="block">
      <div className="card hover:scale-105 transition-all duration-300 h-full">
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden rounded-lg mb-4">
          <img
            src={course.courseImage || 'https://via.placeholder.com/400x300'}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          {course.status === 'available' && (
            <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Available
            </span>
          )}
          {course.status === 'pending' && (
            <span className="absolute top-2 right-2 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              Pending
            </span>
          )}
        </div>

        {/* Course Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2">
            {course.title}
          </h3>
          
          <p className="text-gray-600 text-sm line-clamp-3">
            {course.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FaUsers className="mr-1" />
                {course.totalEnrolled || 0}
              </span>
              <span className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`text-xs ${
                      star <= Math.round(course.averageRating || 5)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-1">
                  {(course.averageRating || 5).toFixed(1)}
                </span>
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="pt-4 border-t flex items-center justify-between">
            <div className="flex items-center text-primary-600 font-bold text-2xl">
              <FaMoneyBillWave className="mr-2" />
              ৳{course.price}
            </div>
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {course.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
