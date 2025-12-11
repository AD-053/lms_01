# Quick Setup Guide

## Backend Setup

1. Navigate to the Backend directory:
```bash
cd Back-end
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=8002
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESS_TOKEN_SECRET=your_refresh_token_secret
REFRESS_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on: `http://localhost:8002`

## Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Front-end
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

## Quick Test Flow

### 1. Register Users

**Register a Learner:**
- Go to `http://localhost:3000/register`
- Fill in the form with Role: "Learner"
- Upload a profile picture
- Submit

**Register an Instructor:**
- Go to `http://localhost:3000/register`
- Fill in the form with Role: "Instructor"
- Upload a profile picture
- Submit

**Note:** Admin account should be created manually in the database with the ID: `6931e0c79e0db4bfdba05543`

### 2. Login
- Go to `http://localhost:3000/login`
- Enter credentials (username/email and password)
- You'll be redirected to the dashboard

### 3. Set Up Bank Account
- Click on "Bank Setup" in the sidebar
- Add your account number and secret key
- Add some balance (e.g., 10000 BDT)

### 4. Browse & Enroll (Learner)
- Click on "Browse Courses"
- Select a course
- Click "Enroll Now"
- Enter your secret key to confirm payment
- Wait for admin approval

### 5. Create Course (Instructor)
- Login as instructor
- Click "Add Course"
- Fill in course details
- Upload course image
- Submit (course will be pending admin approval)

### 6. Approve Courses (Admin)
- Login as admin
- Go to "Approve Courses"
- Click approve on pending courses
- Enter payment amount for instructor

### 7. Approve Enrollments (Admin)
- Go to "Approve Enrollments"
- Review pending enrollments
- Click approve to confirm payment and activate enrollment

### 8. Issue Certificates (Admin)
- Go to "Issue Certificates"
- View students who completed 80%+ of course
- Issue certificates

## Common Issues & Solutions

### Backend not connecting to MongoDB
- Check your MONGODB_URI in .env
- Ensure MongoDB is running
- Check network connectivity

### Frontend can't connect to backend
- Ensure backend is running on port 8002
- Check CORS settings in backend
- Verify API_BASE_URL in frontend

### Cloudinary upload failing
- Verify Cloudinary credentials in .env
- Check file size (should be < 5MB)
- Ensure file format is supported

### Token expiration issues
- Clear localStorage in browser
- Re-login to get new tokens
- Check token expiry settings in .env

## Features Checklist

- [x] User Registration & Login
- [x] Role-based Authentication (Learner, Instructor, Admin)
- [x] Bank Account Setup
- [x] Add Balance
- [x] Browse Courses
- [x] Course Enrollment with Payment
- [x] Admin Approve Enrollments
- [x] Admin Approve Courses
- [x] Instructor Payment on Course Approval
- [x] Instructor Payment on Content Upload
- [x] Issue Certificates
- [x] Beautiful Responsive UI
- [x] Toast Notifications
- [x] Protected Routes

## Project Structure Summary

```
learning_management_system/
├── Back-end/               # Node.js + Express backend
│   ├── src/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Routes/
│   │   ├── Middleware/
│   │   └── Utils/
│   └── package.json
└── Front-end/             # React + Vite + Tailwind frontend
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   └── App.jsx
    └── package.json
```

## Tech Stack

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (File Upload)
- Bcrypt (Password Hashing)

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- React Icons

## Contact & Support

For any issues or questions, please contact the development team.

Happy Learning! 🎓
