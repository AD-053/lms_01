# LMS Frontend - Learning Management System

A modern, beautiful, and fully functional frontend for the Learning Management System built with React, Vite, and Tailwind CSS.

## 🎨 Features

### General Features
- **Beautiful UI**: Modern gradient designs with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Role-Based Access**: Different interfaces for Learners, Instructors, and Admins
- **Real-time Updates**: Toast notifications for all actions
- **Protected Routes**: Secure authentication and authorization

### For Learners
- Browse and search through 5 available courses
- Enroll in courses with secure payment
- Bank account setup with encrypted secret key
- Add balance to account
- View enrolled courses
- Track course progress
- Earn certificates upon completion

### For Instructors
- Create new courses with images
- Upload course materials (text, video, audio, pictures, MCQs)
- Manage created courses
- View earnings
- Get paid for course launches and content uploads

### For Admins
- Approve pending courses
- Approve student enrollments
- Issue certificates to eligible students
- Manage platform balance
- Pay instructors for courses and content

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on `http://localhost:8002`

### Installation

1. Navigate to the Frontend directory:
```bash
cd Front-end
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

## 📁 Project Structure

```
Front-end/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Layout.jsx
│   │   ├── CourseCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/            # React Context
│   │   └── AuthContext.jsx
│   ├── pages/              # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── BankSetup.jsx
│   │   ├── Courses.jsx
│   │   ├── CourseDetail.jsx
│   │   ├── MyCourses.jsx
│   │   ├── Certificates.jsx
│   │   ├── Profile.jsx
│   │   ├── Unauthorized.jsx
│   │   ├── instructor/
│   │   │   └── AddCourse.jsx
│   │   └── admin/
│   │       ├── ApproveCourses.jsx
│   │       ├── ApproveEnrollments.jsx
│   │       └── IssueCertificates.jsx
│   ├── services/           # API services
│   │   └── api.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0284c7)
- **Secondary**: Purple gradient (#d946ef to #c026d3)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Yellow (#f59e0b)

### Components
- **Buttons**: `btn-primary`, `btn-secondary`, `btn-outline`
- **Cards**: `card` class with hover effects
- **Inputs**: `input-field` class with focus states
- **Labels**: `label` class with icons support

## 🔐 Authentication Flow

1. **Register**: User creates account with profile picture
2. **Login**: User logs in with username/email and password
3. **Token Storage**: Access and refresh tokens stored in localStorage
4. **Auto Refresh**: Tokens automatically refresh on expiry
5. **Protected Routes**: Role-based access control

## 💳 Payment Flow

1. **Bank Setup**: User adds bank account with secret key
2. **Add Balance**: User adds money to their account
3. **Course Enrollment**: User enrolls with balance and secret key
4. **Payment Processing**: Money deducted and transaction created
5. **Admin Approval**: Admin approves enrollment
6. **Instructor Payment**: 60% of course price paid to instructor

## 📱 Key Pages

### Dashboard
- Role-specific welcome message
- Quick stats cards
- Quick action buttons
- Bank account status

### Courses
- Grid of all 5 courses
- Search functionality
- Filter by status
- Beautiful course cards

### Course Detail
- Full course information
- Enrollment modal with payment
- Secret key verification
- Balance checking

### Bank Setup
- Add bank account form
- Add balance form
- Current balance display
- Secure secret key handling

## 🔧 Configuration

### API Base URL
Update in `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8002/api/v1';
```

### Admin ID
Update in `src/pages/CourseDetail.jsx`:
```javascript
const ADMIN_ID = '6931e0c79e0db4bfdba05543';
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Testing Credentials

Create test accounts for each role:

**Learner:**
- Username: learner1
- Email: learner@test.com
- Password: password123
- Role: learner

**Instructor:**
- Username: instructor1
- Email: instructor@test.com
- Password: password123
- Role: instructor

**Admin:**
- Username: admin
- Email: admin@test.com
- Password: password123
- Role: admin

## 🐛 Known Issues & Notes

1. **Course Data**: Currently using mock data for courses. To use real backend data, implement a `GET /api/v1/courses` endpoint in the backend.

2. **Image Placeholders**: Some images use placeholder URLs from unsplash. Replace with actual course images.

3. **Material Upload**: Material upload component can be added to instructor dashboard for uploading course content.

4. **Progress Tracking**: Video player with progress tracking can be implemented in the learning interface.

## 🌟 Best Practices

- All forms have validation
- Error handling with user-friendly messages
- Loading states for all async operations
- Responsive design for all screen sizes
- Accessible components with proper ARIA labels
- Clean and maintainable code structure

## 📦 Dependencies

- **react**: UI library
- **react-router-dom**: Routing
- **axios**: HTTP client
- **react-hot-toast**: Toast notifications
- **react-icons**: Icon library
- **tailwindcss**: Utility-first CSS framework

## 🤝 Contributing

1. Follow the existing code style
2. Use meaningful commit messages
3. Test all features before committing
4. Update documentation as needed

## 📄 License

This project is part of a Web Technology course assignment.

## 👨‍💻 Author

**Md Rahad Islam**

---

Built with ❤️ using React, Vite, and Tailwind CSS
