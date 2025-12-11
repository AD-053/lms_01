import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { courseAPI, materialAPI, progressAPI } from '../services/api';
import toast from 'react-hot-toast';
import { 
  FaSpinner, 
  FaBook, 
  FaArrowLeft, 
  FaFileAlt, 
  FaVideo, 
  FaImage, 
  FaMusic, 
  FaQuestionCircle,
  FaCheckCircle,
  FaChevronRight,
  FaTimes,
  FaClock
} from 'react-icons/fa';

const MaterialType = {
  TEXT: 'text',
  VIDEO: 'video',
  IMAGE: 'image',
  AUDIO: 'audio',
  MCQ: 'mcq'
};

const CourseLearning = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [currentMaterialIndex, setCurrentMaterialIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [showResults, setShowResults] = useState({});
  const [examStarted, setExamStarted] = useState({});
  const [timeRemaining, setTimeRemaining] = useState({});
  const [timerIntervals, setTimerIntervals] = useState({});

  useEffect(() => {
    fetchCourseAndMaterials();
    
    // Cleanup timers on unmount
    return () => {
      Object.values(timerIntervals).forEach(interval => {
        if (interval) clearInterval(interval);
      });
    };
  }, [id]);

  const startExam = (materialId, duration) => {
    setExamStarted({
      ...examStarted,
      [materialId]: true
    });
    
    const durationInSeconds = duration * 60;
    setTimeRemaining({
      ...timeRemaining,
      [materialId]: durationInSeconds
    });
    
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        const newTime = (prev[materialId] || 0) - 1;
        
        if (newTime <= 0) {
          clearInterval(interval);
          // Auto-submit when time runs out
          const material = materials.find(m => m._id === materialId);
          if (material) {
            checkMcqAnswers(materialId, material);
          }
          toast.error('Time is up! Exam submitted automatically.');
          return { ...prev, [materialId]: 0 };
        }
        
        return { ...prev, [materialId]: newTime };
      });
    }, 1000);
    
    setTimerIntervals({
      ...timerIntervals,
      [materialId]: interval
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const fetchCourseAndMaterials = async () => {
    try {
      const [courseRes, materialsRes] = await Promise.all([
        courseAPI.getCourseById(id),
        materialAPI.getMaterialsByCourse(id)
      ]);
      
      const courseData = courseRes.data.data.course;
      const enrollmentStatus = courseRes.data.data.enrollmentStatus;
      
      // Check if user has access
      if (!enrollmentStatus?.isEnrolled || enrollmentStatus?.paymentStatus !== 'paid') {
        toast.error('You do not have access to this course');
        navigate(`/course/${id}`);
        return;
      }
      
      setCourse(courseData);
      setMaterials(materialsRes.data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching course:', error);
      toast.error(error.response?.data?.message || 'Failed to load course materials');
      navigate(`/course/${id}`);
    }
  };

  const handleMcqAnswer = (materialId, questionIndex, answerIndex) => {
    setMcqAnswers({
      ...mcqAnswers,
      [`${materialId}-${questionIndex}`]: answerIndex
    });
  };

  const checkMcqAnswers = (materialId, material) => {
    // Stop the timer
    if (timerIntervals[materialId]) {
      clearInterval(timerIntervals[materialId]);
    }
    
    const results = {};
    let correctCount = 0;
    let answeredCount = 0;
    
    material.questions.forEach((question, qIndex) => {
      const userAnswer = mcqAnswers[`${materialId}-${qIndex}`];
      const correctAnswer = parseInt(question.answer); // Convert string to number
      
      // Check if question was answered
      const isAnswered = userAnswer !== undefined;
      const isCorrect = isAnswered && userAnswer === correctAnswer;
      
      if (isAnswered) answeredCount++;
      if (isCorrect) correctCount++;
      
      results[qIndex] = {
        userAnswer,
        correctAnswer,
        isCorrect,
        isAnswered
      };
    });
    
    setShowResults({
      ...showResults,
      [materialId]: {
        questions: results,
        score: correctCount,
        total: material.questions.length,
        answered: answeredCount
      }
    });
  };

  const handleNextMaterial = () => {
    if (currentMaterialIndex < materials.length - 1) {
      setCurrentMaterialIndex(currentMaterialIndex + 1);
    }
  };

  const handlePreviousMaterial = () => {
    if (currentMaterialIndex > 0) {
      setCurrentMaterialIndex(currentMaterialIndex - 1);
    }
  };

  const getMaterialIcon = (type) => {
    switch (type) {
      case MaterialType.TEXT:
        return <FaFileAlt className="text-blue-500" />;
      case MaterialType.VIDEO:
        return <FaVideo className="text-red-500" />;
      case MaterialType.IMAGE:
        return <FaImage className="text-green-500" />;
      case MaterialType.AUDIO:
        return <FaMusic className="text-purple-500" />;
      case MaterialType.MCQ:
        return <FaQuestionCircle className="text-orange-500" />;
      default:
        return <FaFileAlt />;
    }
  };

  const renderMaterialContent = (material) => {
    const materialType = material.materialType;

    switch (materialType) {
      case MaterialType.TEXT:
        return (
          <div className="prose max-w-none">
            <div className="bg-white p-6 rounded-lg whitespace-pre-wrap">
              {material.text}
            </div>
          </div>
        );

      case MaterialType.VIDEO:
        return (
          <div className="space-y-4">
            {material.video?.map((vid, index) => (
              <div key={index} className="bg-black rounded-lg overflow-hidden">
                <video 
                  controls 
                  className="w-full"
                  src={vid.url}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </div>
        );

      case MaterialType.IMAGE:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {material.picture?.map((img, index) => (
              <div key={index} className="rounded-lg overflow-hidden">
                <img 
                  src={img.url} 
                  alt={`${material.title} - ${index + 1}`}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </div>
        );

      case MaterialType.AUDIO:
        return (
          <div className="space-y-4">
            {material.audio?.map((aud, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <audio 
                  controls 
                  className="w-full"
                  src={aud.url}
                >
                  Your browser does not support the audio tag.
                </audio>
              </div>
            ))}
          </div>
        );

      case MaterialType.MCQ:
        if (!material.questions || material.questions.length === 0) {
          return <p className="text-gray-500">No questions available</p>;
        }
        
        const result = showResults[material._id];
        const isExamStarted = examStarted[material._id];
        const timeLeft = timeRemaining[material._id];
        const duration = material.mcqDuration || material.questions.length;
        
        // Show Start Exam button if exam hasn't started
        if (!isExamStarted && !result) {
          return (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg text-center">
              <FaQuestionCircle className="text-6xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">MCQ Exam</h3>
              <p className="text-gray-600 mb-2">
                Questions: {material.questions.length}
              </p>
              <p className="text-gray-600 mb-6">
                Duration: {duration} minutes
              </p>
              <div className="bg-yellow-50 border border-yellow-300 p-4 rounded-lg mb-6">
                <p className="text-yellow-800 font-semibold">⚠️ Important Instructions:</p>
                <ul className="text-left text-yellow-700 mt-2 space-y-1">
                  <li>• Once started, the timer will begin automatically</li>
                  <li>• You must answer all questions before time runs out</li>
                  <li>• The exam will auto-submit when time expires</li>
                  <li>• Make sure you have a stable internet connection</li>
                </ul>
              </div>
              <button
                onClick={() => startExam(material._id, duration)}
                className="btn-primary text-lg px-8 py-3"
              >
                Start Exam
              </button>
            </div>
          );
        }
        
        return (
          <div className="space-y-6">
            {/* Timer Display - Sticky on right */}
            {isExamStarted && !result && (
              <div className="fixed top-24 right-8 z-50">
                <div className={`p-4 rounded-lg shadow-lg ${
                  timeLeft <= 60 ? 'bg-red-100 border-2 border-red-500 animate-pulse' : 'bg-white border-2 border-blue-500'
                }`}>
                  <p className="text-sm text-gray-600 mb-1">Time Remaining</p>
                  <p className={`text-3xl font-bold ${
                    timeLeft <= 60 ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {formatTime(timeLeft)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {timeLeft <= 60 ? 'Hurry up!' : 'Keep going!'}
                  </p>
                </div>
              </div>
            )}
            
            {result && (
              <div className="bg-blue-100 border border-blue-300 p-4 rounded-lg">
                <p className="text-blue-900 font-bold text-lg">
                  Score: {result.score} / {result.total} ({Math.round((result.score / result.total) * 100)}%)
                </p>
                <p className="text-blue-800 text-sm mt-1">
                  Answered: {result.answered} / {result.total} questions
                </p>
              </div>
            )}
            
            {material.questions.map((question, qIndex) => {
              const questionResult = result?.questions?.[qIndex];
              const userAnswer = mcqAnswers[`${material._id}-${qIndex}`];
              
              return (
                <div key={qIndex} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex items-start gap-3 mb-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                      {qIndex + 1}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 flex-1">
                      {question.question}
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {question.options?.map((option, optIndex) => {
                      const isCorrectAnswer = questionResult?.correctAnswer === optIndex;
                      const isUserAnswer = questionResult?.userAnswer === optIndex;
                      const isSelected = userAnswer === optIndex;
                      
                      let optionClass = 'bg-gray-50 border-gray-300 hover:bg-gray-100';
                      
                      if (questionResult) {
                        if (isCorrectAnswer) {
                          optionClass = 'bg-green-100 border-green-500';
                        } else if (isUserAnswer && !isCorrectAnswer) {
                          optionClass = 'bg-red-100 border-red-500';
                        } else {
                          optionClass = 'bg-gray-50 border-gray-300';
                        }
                      } else if (isSelected) {
                        optionClass = 'bg-blue-100 border-blue-500';
                      }
                      
                      return (
                        <label
                          key={optIndex}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${optionClass}`}
                        >
                          <input
                            type="radio"
                            name={`mcq-${material._id}-${qIndex}`}
                            value={optIndex}
                            checked={isSelected}
                            onChange={() => handleMcqAnswer(material._id, qIndex, optIndex)}
                            disabled={!!questionResult}
                            className="mr-3"
                          />
                          <span className="flex-1">{option}</span>
                          {questionResult && isCorrectAnswer && (
                            <FaCheckCircle className="text-green-600 ml-2 text-xl" />
                          )}
                          {questionResult && isUserAnswer && !isCorrectAnswer && (
                            <FaTimes className="text-red-600 ml-2 text-xl" />
                          )}
                        </label>
                      );
                    })}
                  </div>
                  
                  {questionResult && (
                    <div className={`mt-3 p-3 rounded-lg ${
                      questionResult.isCorrect 
                        ? 'bg-green-50 text-green-800' 
                        : questionResult.isAnswered 
                        ? 'bg-red-50 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {questionResult.isCorrect ? (
                        <p className="text-sm font-semibold">✓ Correct!</p>
                      ) : questionResult.isAnswered ? (
                        <p className="text-sm font-semibold">✗ Incorrect - Correct answer highlighted above</p>
                      ) : (
                        <p className="text-sm font-semibold">⊘ Not Answered - Correct answer highlighted above</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
            
            {!result ? (
              <button
                onClick={() => checkMcqAnswers(material._id, material)}
                className="btn-primary w-full"
              >
                Submit Answers
              </button>
            ) : (
              <div className={`p-6 rounded-lg text-center ${
                result.score === result.total 
                  ? 'bg-green-100 text-green-800' 
                  : result.score >= result.total / 2 
                  ? 'bg-yellow-100 text-yellow-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {result.score === result.total ? (
                  <>
                    <p className="font-bold text-xl">🎉 Perfect Score! You got all answers correct!</p>
                    <p className="text-sm mt-2">Answered: {result.answered}/{result.total}</p>
                  </>
                ) : result.score >= result.total / 2 ? (
                  <>
                    <p className="font-bold text-xl">👍 Good Job! You passed with {result.score} out of {result.total} correct.</p>
                    <p className="text-sm mt-2">Answered: {result.answered}/{result.total}</p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-xl">📚 Keep Learning! You got {result.score} out of {result.total} correct.</p>
                    <p className="text-sm mt-2">Answered: {result.answered}/{result.total}</p>
                  </>
                )}
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-gray-500">Unsupported material type</p>;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <FaSpinner className="animate-spin text-5xl text-primary-500" />
        </div>
      </Layout>
    );
  }

  if (materials.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(`/course/${id}`)}
            className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            Back to Course
          </button>
          <div className="card text-center py-12">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Materials Yet</h2>
            <p className="text-gray-500">The instructor hasn't added any materials to this course yet.</p>
          </div>
        </div>
      </Layout>
    );
  }

  const currentMaterial = materials[currentMaterialIndex];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate(`/course/${id}`)}
          className="text-primary-600 hover:text-primary-700 mb-4 flex items-center"
        >
          <FaArrowLeft className="mr-2" />
          Back to Course
        </button>

        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {course?.title}
          </h1>
          <p className="text-gray-600">
            Material {currentMaterialIndex + 1} of {materials.length}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Material List */}
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h3 className="font-bold text-gray-900 mb-4">Course Content</h3>
              <div className="space-y-2">
                {materials.map((material, index) => (
                  <button
                    key={material._id}
                    onClick={() => setCurrentMaterialIndex(index)}
                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
                      index === currentMaterialIndex
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span className="text-xl mr-3">
                      {getMaterialIcon(material.materialType)}
                    </span>
                    <span className="flex-1 text-sm">{material.title}</span>
                    {index === currentMaterialIndex && (
                      <FaChevronRight className="ml-2" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="card">
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <span className="text-2xl mr-3">
                    {getMaterialIcon(currentMaterial.materialType)}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentMaterial.title}
                  </h2>
                </div>
                {currentMaterial.description && (
                  <p className="text-gray-600">{currentMaterial.description}</p>
                )}
              </div>

              {/* Material Content */}
              <div className="mb-6">
                {renderMaterialContent(currentMaterial)}
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t">
                <button
                  onClick={handlePreviousMaterial}
                  disabled={currentMaterialIndex === 0}
                  className="btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaArrowLeft className="inline mr-2" />
                  Previous
                </button>
                <span className="text-gray-600">
                  {currentMaterialIndex + 1} / {materials.length}
                </span>
                <button
                  onClick={handleNextMaterial}
                  disabled={currentMaterialIndex === materials.length - 1}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <FaChevronRight className="inline ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseLearning;
