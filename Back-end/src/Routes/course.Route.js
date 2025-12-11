import { Router } from "express";
import { upload } from "../Middleware/Multer.Middleware.js";

import { jwtVerification } from "../Middleware/Authentication.Middleware.js";
import { addCourse, courseEnroll, pendingCourseList, allCourseList, enrolledCourseList, availabeCourseList, getCourseById, getInstructorCourses, getInstructorPendingEnrollments, rateCourse, getCourseRating } from "../Controllers/Course.controller.js";
import { addMaterial, getAllmaterialList, updateMaterial, deleteMaterial } from "../Controllers/material.controller.js";
import { approvedCourse, approvedEnroll, issueCertificate, getPendingEnrollments } from "../Controllers/admin.controller.js";
import { updateProgress } from "../Controllers/progress.controller.js";
const router=Router();


router.route("/addcourse").post(

    jwtVerification,
    upload.fields([
        {
           name:"courseImage",
           maxCount:1 
        }
    ]),addCourse
)


router.route("/contentUpload").post(
    jwtVerification,
    upload.fields([
        {
            name:"audio",
            maxCount:10
        },
         {
            name:"video",
            maxCount:5
        },
           {
            name:"picture",
            maxCount:10
        }
         
    ]),
    addMaterial
)


router.route("/courseEnroll").post(jwtVerification,courseEnroll)

router.route("/approvedEnroll").post(jwtVerification,approvedEnroll);
router.route("/approvedCourse").post(jwtVerification,approvedCourse);
router.route("/pendingEnrollments").get(jwtVerification, getPendingEnrollments);

router.route("/getAllmaterialList").post(jwtVerification,getAllmaterialList)

router.route("/updateProgress").post(jwtVerification,updateProgress)
router.route("/issueCertificate").post(jwtVerification,issueCertificate)

// Course list routes
router.route("/pendingCourses").get(jwtVerification, pendingCourseList);
router.route("/allCourses").get(jwtVerification, allCourseList);
router.route("/enrolledCourses").get(jwtVerification, enrolledCourseList);
router.route("/availableCourses").get(jwtVerification, availabeCourseList);
router.route("/instructorCourses").get(jwtVerification, getInstructorCourses);
router.route("/instructorPendingEnrollments").get(jwtVerification, getInstructorPendingEnrollments);
router.route("/:id").get(jwtVerification, getCourseById);

router.route("/updateMaterial").post(jwtVerification,
     upload.fields([
        {
            name:"audio",
            maxCount:10
        },
         {
            name:"video",
            maxCount:5
        },
           {
            name:"picture",
            maxCount:10
        }
         
    ]),
    updateMaterial);

router.route("/material/:materialId").patch(jwtVerification,
     upload.fields([
        {
            name:"audio",
            maxCount:10
        },
         {
            name:"video",
            maxCount:5
        },
           {
            name:"picture",
            maxCount:10
        }
         
    ]),
    updateMaterial);

router.route("/material/:materialId").delete(jwtVerification, deleteMaterial);

router.route("/rateCourse").post(jwtVerification, rateCourse);
router.route("/rating/:courseID").get(jwtVerification, getCourseRating);

export default router