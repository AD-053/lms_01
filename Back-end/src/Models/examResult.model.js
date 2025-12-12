import mongoose from "mongoose";

const examResultSchema = new mongoose.Schema({
  courseID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  },
  
  learnerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  materialID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true
  },
  
  answers: [{
    questionIndex: { type: Number },
    selectedAnswer: { type: String },
    isCorrect: { type: Boolean }
  }],
  
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  
  totalQuestions: {
    type: Number,
    required: true
  },
  
  correctAnswers: {
    type: Number,
    required: true
  },
  
  timeTaken: {
    type: Number, // in seconds
    default: 0
  },
  
  completedAt: {
    type: Date,
    default: Date.now
  }
  
}, { timestamps: true });

// Compound unique index to ensure one exam attempt per learner per material
examResultSchema.index({ learnerID: 1, materialID: 1 }, { unique: true });

export const ExamResult = mongoose.model("ExamResult", examResultSchema);
