import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
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
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    default: ""
  }
}, { timestamps: true });

// Ensure one rating per learner per course
ratingSchema.index({ courseID: 1, learnerID: 1 }, { unique: true });

export const Rating = mongoose.model("Rating", ratingSchema);
