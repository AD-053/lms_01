# 🎓 Learning Management System - Complete Project Summary

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [User Roles](#user-roles)
4. [Complete Workflows](#complete-workflows)
5. [Key Features](#key-features)
6. [System Architecture](#system-architecture)
7. [Setup Instructions](#setup-instructions)

---

## 🎯 Project Overview

A full-stack **Learning Management System** that simulates a real-world online learning platform with three user roles: **Admin**, **Instructor**, and **Learner**. The system includes course management, payment processing, sequential learning, progress tracking, and certificate issuance.

**Built for:** Web Technology Final Project  
**Purpose:** Create a comprehensive e-learning platform with complete user workflows

---

## 💻 Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication (Access & Refresh tokens)
- **Cloudinary** - File storage (images, videos, PDFs)
- **Bcrypt** - Password encryption
- **Multer** - File upload handling

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **React Icons** - Icons

---

## 👥 User Roles

### 1️⃣ **Admin**
- Manages the entire platform
- Approves courses and enrollments
- Issues certificates
- Receives and distributes payments
- Has full system access

### 2️⃣ **Instructor**
- Creates and manages courses
- Uploads course materials
- Receives 60% of enrollment fees
- Gets ৳100 per material uploaded
- Can view enrolled students

### 3️⃣ **Learner (Student)**
- Browses and enrolls in courses
- Makes payments for courses
- Accesses course materials
- Completes exams and assignments
- Earns certificates

---

## 🔄 Complete Workflows

### **Workflow 1: User Registration & Setup** 🆕

1. **Registration**
   - User goes to registration page
   - Fills form: Name, Email, Username, Password, Role (learner/instructor), Profile Picture
   - System creates account with hashed password
   - User is redirected to login

2. **Login**
   - User enters email and password
   - System verifies credentials
   - Generates JWT tokens (access + refresh)
   - Redirects to dashboard

3. **Bank Setup** 💰
   - **Required before any transactions**
   - User goes to Bank Setup page
   - Enters: Account number, Secret key (encrypted)
   - Can add balance to account
   - All transactions require this setup

---

### **Workflow 2: Course Creation & Approval** 📚

1. **Instructor Creates Course**
   - Goes to "Add Course" page
   - Fills in: Title, Description, Price, Course Image
   - Submits the course
   - Course status: **Pending** (not visible to students)

2. **Admin Approves Course**
   - Admin sees pending courses in dashboard
   - Reviews course details
   - Approves course with payment (course launch fee)
   - **Instructor receives the launch fee**
   - Course status changes to **Available** (visible to students)

---

### **Workflow 3: Course Structure Setup** 📖

1. **Instructor Creates Classes**
   - Opens course management
   - Creates classes (modules) with:
     - Title and Description
     - Sequential order (Class 1, Class 2, etc.)
   - Can reorder classes anytime

2. **Instructor Uploads Materials**
   - Selects a class
   - Uploads materials in order:
     - **Text** (PDF documents)
     - **Video** (MP4 files)
     - **Audio** (MP3 files)
     - **Images** (PNG/JPG)
     - **MCQ Exams** (Multiple choice questions)
   - Each material has title, description, and content
   - **Instructor receives ৳100 per material uploaded**

3. **Final Exam Setup** 🏆
   - Instructor marks one material as "Final Exam"
   - Can be any material type (MCQ recommended)
   - **Once final exam is uploaded, NO MORE materials can be added**
   - Course structure is complete

---

### **Workflow 4: Course Enrollment & Payment** 💳

1. **Student Browses Courses**
   - Views available courses
   - Sees course details, price, instructor info
   - Clicks "Enroll Now"

2. **Payment Process**
   - Student clicks enroll button
   - Enters bank secret key for payment
   - Payment amount deducted from student's balance
   - **Admin receives the full payment**
   - Enrollment status: **Pending**

3. **Admin Approves Enrollment**
   - Admin views pending enrollments
   - Verifies payment
   - Approves enrollment
   - **60% of course price transferred to instructor**
   - **40% retained by admin**
   - Enrollment status: **Active**
   - Student gets access to course

---

### **Workflow 5: Learning Process** 📚

1. **Sequential Learning System**
   - Student sees course structure (classes and materials)
   - **Materials unlock sequentially:**
     - First material in first class: Always unlocked
     - Next material: Unlocks after completing previous
     - Next class: Unlocks after completing ALL materials in previous class

2. **Completing Different Material Types**

   **Text/PDF Materials:**
   - Student reads the content
   - Clicks "Mark as Completed"
   - Material marked as done

   **Video Materials:**
   - Student watches video
   - Progress tracked automatically
   - Auto-completes at 80% watched

   **Audio Materials:**
   - Student listens to audio
   - Clicks "Mark as Completed" when done

   **Image Materials:**
   - Student views images
   - Clicks "Mark as Completed"

   **MCQ Exams:**
   - Student answers all questions
   - Has time limit (if set)
   - Submits exam (ONE ATTEMPT ONLY)
   - System calculates score
   - Automatically marks as completed

3. **Progress Tracking**
   - System calculates: (Completed materials / Total materials) × 100
   - Progress shown on dashboard
   - Progress bar on course page
   - Final exam excluded from progress calculation

4. **Taking Final Exam** 🎯
   - Unlocks after 100% regular materials completed
   - Student takes final exam (one attempt)
   - Score must be ≥60% to be eligible for certificate
   - Results saved immediately

---

### **Workflow 6: Certificate System** 🎖️

1. **Certificate Eligibility**
   - Student must complete:
     - ✅ Final exam with ≥60% score
     - ✅ Average ≥60% across all exams
     - ✅ Watch ≥80% of all videos
     - ✅ Active enrollment

2. **Request Certificate**
   - Student goes to Certificates page
   - Sees eligible courses
   - Clicks "Request Certificate"
   - Request sent to admin
   - Status: **Pending**

3. **Admin Reviews & Issues**
   - Admin sees pending certificate requests
   - Reviews student's performance
   - **Approves** or **Rejects** with reason
   - If approved:
     - Certificate status: **Approved**
     - Certificate code generated
     - Issued date recorded

4. **Student Views Certificate**
   - Goes to "My Certificates" page
   - Views approved certificates
   - Can download as PDF
   - Certificate shows:
     - Student name
     - Course name
     - Completion date
     - Certificate code
     - Score

---

### **Workflow 7: Dashboard Features** 📊

**Student Dashboard:**
- Account Balance
- Enrolled Courses Count (real-time)
- Certificates Count (real-time)
- Quick actions: Browse courses, View enrolled courses, Manage balance

**Instructor Dashboard:**
- Account Balance
- My Courses Count (real-time)
- Total Students Count (real-time, sum of all course enrollments)
- Quick actions: Create course, Manage courses, View earnings

**Admin Dashboard:**
- Account Balance
- Total Courses Count (real-time)
- Pending Approvals Count (real-time)
- Pending Certificates Count (real-time)
- Quick actions: Approve courses, Approve enrollments, Issue certificates

---

## 🎨 Key Features

### 🔐 Authentication & Security
- ✅ JWT-based authentication (Access + Refresh tokens)
- ✅ Automatic token refresh on expiry
- ✅ Password hashing with bcrypt
- ✅ Protected routes by role
- ✅ Encrypted bank secret keys
- ✅ Session management

### 💰 Banking & Payments
- ✅ Secure bank account setup
- ✅ Add balance to account
- ✅ Transaction verification
- ✅ Payment flow: Student → Admin → Instructor (60%)
- ✅ Instructor payment: ৳100 per material upload
- ✅ Transaction history

### 📚 Course Management
- ✅ Course creation with images
- ✅ Course approval workflow
- ✅ Course rating system
- ✅ Browse available courses
- ✅ Filter courses by status
- ✅ Course search functionality

### 📖 Learning System
- ✅ Sequential material unlocking
- ✅ Multiple material types (text, video, audio, image, MCQ)
- ✅ Progress tracking (0-100%)
- ✅ Video watch time tracking
- ✅ MCQ exams with scoring
- ✅ Final exam system
- ✅ One-attempt exam policy

### 🎖️ Certification
- ✅ Automated eligibility checking
- ✅ Certificate request system
- ✅ Admin approval workflow
- ✅ Certificate viewing/download
- ✅ Unique certificate codes
- ✅ Rejection with reasons

### 🎨 UI/UX Features
- ✅ Modern, professional design
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Beautiful gradient color schemes
- ✅ Toast notifications for all actions
- ✅ Loading states and animations
- ✅ Form validation
- ✅ Error handling with user-friendly messages
- ✅ Smooth page transitions
- ✅ Interactive components

---

## 🏗️ System Architecture

### Database Models

1. **User Model**
   - User information (name, email, username, password, role)
   - Profile picture, balance
   - Bank account details (encrypted)

2. **Course Model**
   - Course details (title, description, price, image)
   - Owner (instructor), status, ratings
   - Active/inactive flag

3. **Class Model**
   - Class information (title, description, order)
   - Belongs to a course
   - Final exam flag

4. **Material Model**
   - Material content (text, video, audio, image, MCQ)
   - Belongs to a class
   - Sequential order, final exam flag

5. **Enrollment Model**
   - Student-Course relationship
   - Payment status, enrollment status
   - Progress tracking

6. **Progress Model**
   - Tracks completed materials
   - Per student, per course, per material
   - Completion timestamps

7. **Certificate Model**
   - Certificate information
   - Status (pending/approved/rejected)
   - Score, certificate code
   - Approval details

8. **Bank/Transaction Model**
   - All monetary transactions
   - From/to users, amounts
   - Transaction status

9. **Exam Result Model**
   - MCQ exam results
   - Student answers, correct answers
   - Score, submission time

---

## 📁 Project Structure

```
learning_management_system/
│
├── Back-end/
│   ├── src/
│   │   ├── Controllers/       # Business logic for all features
│   │   ├── Models/            # MongoDB schemas
│   │   ├── Routes/            # API endpoints
│   │   ├── Middleware/        # Auth, file upload, email
│   │   ├── Utils/             # Helper functions
│   │   ├── DB/                # Database connection
│   │   ├── app.js             # Express configuration
│   │   └── index.js           # Server entry point
│   └── package.json
│
├── Front-end/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API service layer
│   │   ├── context/           # React context (Auth)
│   │   ├── App.jsx            # Main app component
│   │   └── main.jsx           # React entry point
│   └── package.json
│
└── Documentation files (.md)
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- Cloudinary account (for file storage)

### Backend Setup

1. **Navigate to backend:**
   ```bash
   cd Back-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   PORT=8002
   MONGODB_URI=your_mongodb_connection_string
   CORS_ORIGIN=http://localhost:3000
   
   ACCESS_TOKEN_SECRET=your_secret_key
   ACCESS_TOKEN_EXPIRY=1d
   REFRESS_TOKEN_SECRET=your_refresh_secret
   REFRESS_TOKEN_EXPIRY=10d
   
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. **Start server:**
   ```bash
   npm run dev
   ```
   Backend runs at: `http://localhost:8002`

### Frontend Setup

1. **Navigate to frontend:**
   ```bash
   cd Front-end
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend runs at: `http://localhost:3000`

### Initial Admin Setup

1. **Create admin account:**
   - Register with role: "admin"
   - Note: First user with admin role becomes the system admin

2. **Get Admin ID:**
   - Check MongoDB for admin user ID
   - Update `Back-end/src/constant.js` with admin ID:
     ```javascript
     export const adminID = "your_admin_user_id";
     ```

3. **Restart backend server**

---

## 📊 Data Flow Summary

### Course Creation Flow
```
Instructor creates course → Admin approves → Instructor paid → Course available
```

### Enrollment Flow
```
Student enrolls → Pays → Admin receives → Admin approves → 60% to Instructor → Student gets access
```

### Learning Flow
```
Student accesses course → Completes materials sequentially → Takes final exam → Requests certificate
```

### Certificate Flow
```
Student requests → Admin reviews → Approves/Rejects → Student receives certificate
```

### Payment Flow
```
Student Payment → Admin receives 100% → Admin distributes 60% to Instructor (40% retained)
```

---

## 🎯 Key Business Rules

1. **Bank Account Required**: All users must set up bank accounts before any transactions
2. **Course Approval**: Courses must be approved by admin before being visible to students
3. **Enrollment Approval**: Enrollments must be approved by admin after payment
4. **Sequential Learning**: Materials unlock only after completing previous ones
5. **Final Exam**: Only one per course, no materials can be added after final exam
6. **One Attempt**: MCQ exams (including final) allow only one submission
7. **Certificate Eligibility**: 60% final exam score + 60% average + 80% video completion
8. **Payment Split**: 60% to instructor, 40% to admin/platform
9. **Material Payment**: Instructor receives ৳100 for each material uploaded

---

## 🔒 Security Features

- ✅ JWT authentication with refresh tokens
- ✅ Password hashing using bcrypt
- ✅ Bank secret key encryption
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ Input validation on all forms
- ✅ CORS configuration
- ✅ Automatic token refresh
- ✅ Secure file upload validation

---

## 🎨 UI Highlights

- **Modern Design**: Clean, professional interface with gradient accents
- **Responsive**: Works perfectly on mobile, tablet, and desktop
- **Color Scheme**: Blue (primary) and purple (secondary) gradients
- **Notifications**: Toast messages for all user actions
- **Loading States**: Spinners and skeletons for async operations
- **Animations**: Smooth transitions and hover effects
- **Form Validation**: Real-time validation with error messages
- **Icons**: Consistent icon usage throughout

---

## 📝 Testing the System

### Complete Test Scenario:

1. **Create 3 Users:**
   - 1 Admin
   - 1 Instructor
   - 1 Student

2. **Setup:**
   - All users set up bank accounts
   - Add balance to student and admin accounts

3. **Course Creation:**
   - Instructor creates a course
   - Admin approves with payment

4. **Course Structure:**
   - Instructor creates 2-3 classes
   - Uploads 5-6 materials per class
   - Marks one material as final exam

5. **Enrollment:**
   - Student enrolls in course
   - Admin approves enrollment
   - Verify instructor receives 60%

6. **Learning:**
   - Student completes materials sequentially
   - Takes MCQ exams
   - Completes final exam with >60%

7. **Certification:**
   - Student requests certificate
   - Admin approves
   - Student views certificate

---

## 🎓 Academic Context

**Course:** Web Technology  
**Project Type:** Final Project  
**Semester:** 2nd Year, 2nd Semester  
**Year:** 2026

**Learning Outcomes Demonstrated:**
- Full-stack web development
- RESTful API design
- Database modeling and relationships
- User authentication and authorization
- File upload and storage
- State management
- Responsive design
- Modern UI/UX principles
- Complex business logic implementation
- Real-world application development

---

## 📞 Support & Documentation

For detailed implementation guides, see:
- `PROJECT_DOCUMENTATION.md` - Complete technical documentation
- `SETUP_GUIDE.md` - Detailed setup instructions
- `SEQUENTIAL_LEARNING_SYSTEM.md` - Learning system details
- `CERTIFICATE_SYSTEM_GUIDE.md` - Certificate system details
- `MATERIAL_BASED_FINAL_EXAM.md` - Final exam implementation
- `TESTING_GUIDE.md` - Testing procedures

---

## ✨ Project Highlights

1. **Complete E-Learning Platform** - All essential LMS features implemented
2. **Three User Roles** - Admin, Instructor, Learner with distinct workflows
3. **Real Payment System** - Simulated banking with transaction flow
4. **Sequential Learning** - Progressive unlocking of course materials
5. **Certificate System** - Complete request, approval, and issuance workflow
6. **Modern Tech Stack** - Latest versions of React, Node.js, MongoDB
7. **Professional UI** - Beautiful, responsive design with animations
8. **Production-Ready** - Error handling, validation, security features
9. **Well-Documented** - Comprehensive documentation for all features
10. **Scalable Architecture** - Modular, maintainable code structure

---

**Built with ❤️ for Web Technology Final Project - 2026**
