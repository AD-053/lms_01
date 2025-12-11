import { Course } from "../Models/Course.model.js";
import { Enroll } from "../Models/enroll.model.js";
import { User } from "../Models/User.Model.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { AsynHandler } from "../Utils/AsyncHandler.js";
import { FileDelete, FileUpload } from "../Utils/Cloudinary.js";
import jwt from 'jsonwebtoken';
import { transaction } from "../Utils/transaction.js";


const addCourse=AsynHandler(async(req,res)=>{
     const {title,description,price}=req.body;


     if(!title || !description || !price){
        throw new ApiError(401,"All fields are required ");
     }
     if(Number(price)<0){
        throw new ApiError(401,"price can not be negative");
     }

    
     const user=await User.findById(req.user?._id);
     if(!user){
        throw new ApiError(401,"userId not valid");
     }

     if(user.Role!=="admin" && user.Role!=="instructor"){
        throw new ApiError(401,"only admin and instructor can lanch a course ");
     }

     let courseImageLocalPath="";
         if (
                 Array.isArray(req.files?.courseImage) &&
                 req.files?.courseImage.length > 0 
                )
            {
           courseImageLocalPath=req.files?.courseImage[0]?.path;
         }
     
     
     
         if(!courseImageLocalPath){
             throw new ApiError(401,"course picture is required");
         }
       
         console.log(courseImageLocalPath);
     
      const courseImage=await FileUpload(courseImageLocalPath);

      if(!courseImage){
        throw new ApiError(501,"cloudinary problem");
      }

      const course=await Course.create({
          title,
          description,
          price,
          courseImage:courseImage?.url,
          courseImagePublicID:courseImage?.public_id,
          owner:user._id
      })
   

    console.log("course added succesfully ");

    return res
    .status(201)
    .json(
        new ApiResponse(201,course,"course added succesfully")
    )
})


const courseEnroll=AsynHandler(async(req,res)=>{
      const {courseID,price,adminID,secretKey}=req.body;
      console.log(courseID);

      if(!courseID){
        throw new ApiError(401,"courseID needed! ");
      }
      

      const courseCheck=await Enroll.findOne({
           courseID:courseID,
           learnerID:req.user?._id 
      });

      if(courseCheck?.paymentStatus==="pending" || courseCheck?.paymentStatus==="paid"){
         throw new ApiError(401,"payment already done ")
      }

  
      if(!adminID){
        throw new ApiError(401, "adminID not valid")
      }

      const adminid=await User.findById(adminID);
      if(!adminid || adminid.Role!=="admin"){
         throw new ApiError(401, "admin are required ");
      }

      const course=await Course.findById(courseID);
      if(!course){
        throw new ApiError(501,"course not found");
      }

     if(course.isActive==false){
        throw new ApiError(401,"course are not availabe ")
     }
      if(price!=course.price){
        throw new ApiError(401,"price are not same")
      }

      const user=await User.findById(req.user?._id);
      if(!user){
        throw new ApiError(401,"user not found");
      }
    
      const IsSecretCorr=await user.IssecretKeyCorrect(secretKey);
      if(!IsSecretCorr)throw new ApiError(401,"secret key invalid");

      if(price>user.balance){
        throw new ApiError(401,"balance are insufficient!");
      }
      
      user.balance=Number(user.balance)-Number(price);

      const txn=new transaction(user._id,adminID,price,`purchase course: ${course.title}`)
      const transactionID=await txn.tnx();
      const enrolled=await Enroll.create({
         courseID,
         learnerID:user._id,
         enrollAt:new Date(),
         transactionID,
         paymentStatus:"pending"

      })

      await  user.save({validateBeforeSave:false});
      console.log("enrolled succesfully .. awaiting for admin approval");
       

      
      return res
      .status(201)
      .json(
        new ApiResponse(201,enrolled,"enrolled succesfully .. awaiting for admin approval")
      )

})

const pendingCourseList = AsynHandler(async (req, res) => {
    // Get all courses that are pending approval (isActive: false)
    const pendingCourses = await Course.find({ isActive: false })
        .populate('owner', 'FullName Email ProfileImage')
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(200, pendingCourses, "Pending courses fetched successfully")
        );
});

const allCourseList = AsynHandler(async (req, res) => {
    // Get all courses (both active and inactive)
    const allCourses = await Course.find()
        .populate('owner', 'FullName Email ProfileImage')
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(200, allCourses, "All courses fetched successfully")
        );
});

const enrolledCourseList = AsynHandler(async (req, res) => {
    // Get all courses the current user is enrolled in
    const userID = req.user?._id;

    if (!userID) {
        throw new ApiError(401, "User not authenticated");
    }

    // Find all enrollments for this user where payment is approved
    const enrollments = await Enroll.find({ 
        learnerID: userID,
        paymentStatus: "paid" 
    }).populate({
        path: 'courseID',
        populate: {
            path: 'owner',
            select: 'FullName Email ProfileImage'
        }
    }).sort({ enrollAt: -1 });

    // Extract course details from enrollments
    const enrolledCourses = enrollments.map(enrollment => ({
        ...enrollment.courseID._doc,
        enrollmentDate: enrollment.enrollAt,
        enrollmentID: enrollment._id
    }));

    return res
        .status(200)
        .json(
            new ApiResponse(200, enrolledCourses, "Enrolled courses fetched successfully")
        );
});

const availabeCourseList = AsynHandler(async (req, res) => {
    // Get all active/approved courses
    const availableCourses = await Course.find({ isActive: true })
        .populate('owner', 'FullName Email ProfileImage')
        .sort({ createdAt: -1 });

    return res
        .status(200)
        .json(
            new ApiResponse(200, availableCourses, "Available courses fetched successfully")
        );
});

const getCourseById = AsynHandler(async (req, res) => {
    const { id } = req.params;
    const userID = req.user?._id;

    if (!id) {
        throw new ApiError(400, "Course ID is required");
    }

    const course = await Course.findById(id)
        .populate('owner', 'FullName Email ProfileImage');

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    // Check if the current user is enrolled in this course
    let enrollmentStatus = null;
    if (userID) {
        const enrollment = await Enroll.findOne({ 
            courseID: id, 
            learnerID: userID 
        });
        
        if (enrollment) {
            enrollmentStatus = {
                isEnrolled: true,
                paymentStatus: enrollment.paymentStatus,
                status: enrollment.status,
                progress: enrollment.progress,
                enrolledAt: enrollment.enrollAt
            };
        }
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { course, enrollmentStatus }, "Course fetched successfully")
        );
});

export{
    addCourse,
    courseEnroll,
    pendingCourseList,
    allCourseList,
    enrolledCourseList,
    availabeCourseList,
    getCourseById
}