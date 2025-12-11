# Testing Guide - Course List Endpoints

## Prerequisites
- Backend running on `http://localhost:8002`
- Frontend running on `http://localhost:3000`
- MongoDB connected

## Test Scenarios

### 1. Test Available Courses (Public Catalog)

**Endpoint**: GET `/api/v1/course/availableCourses`

**Steps**:
1. Open `http://localhost:3000/courses`
2. Verify page loads without errors
3. If no courses show:
   - Login as instructor
   - Create a course via `/instructor/add-course`
   - Login as admin
   - Approve the course via `/admin/approve-courses`
   - Refresh `/courses` page

**Expected Result**: 
- List of approved courses displayed
- Each course shows image, title, description, price, instructor name
- Search and filter functionality works

---

### 2. Test Pending Courses (Admin)

**Endpoint**: GET `/api/v1/course/pendingCourses`

**Steps**:
1. Login as instructor (Role: "instructor")
2. Navigate to `/instructor/add-course`
3. Fill form and create a course
4. Logout and login as admin (Role: "admin")
5. Navigate to `/admin/approve-courses`

**Expected Result**:
- Newly created course appears in pending list
- Shows course details with instructor name
- "Approve & Pay Instructor" button visible

---

### 3. Test Enrolled Courses (Learner)

**Endpoint**: GET `/api/v1/course/enrolledCourses`

**Steps**:
1. Login as learner (Role: "learner")
2. Navigate to `/courses`
3. Click on a course and enroll
4. Wait for admin to approve enrollment
5. Navigate to `/my-courses`

**Expected Result**:
- Initially shows "No enrolled courses yet"
- After admin approval, enrolled course appears
- Shows enrollment date and course details
- Can click to view course materials

---

### 4. Test All Courses (Admin)

**Endpoint**: GET `/api/v1/course/allCourses`

**Steps**:
1. Login as admin
2. Make an API call or create admin dashboard page:
   ```javascript
   const response = await courseAPI.getAllCourses();
   console.log(response.data.data);
   ```

**Expected Result**:
- Returns both active and inactive courses
- Useful for admin overview

---

## API Testing with Browser Console

Open browser console on any authenticated page and run:

```javascript
// Test Available Courses
fetch('http://localhost:8002/api/v1/course/availableCourses', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
})
.then(r => r.json())
.then(data => console.log('Available Courses:', data));

// Test Enrolled Courses
fetch('http://localhost:8002/api/v1/course/enrolledCourses', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
})
.then(r => r.json())
.then(data => console.log('Enrolled Courses:', data));

// Test Pending Courses (Admin only)
fetch('http://localhost:8002/api/v1/course/pendingCourses', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
  }
})
.then(r => r.json())
.then(data => console.log('Pending Courses:', data));
```

---

## Complete User Flow Test

### A. Instructor Flow
1. Register as instructor (Role: "instructor")
2. Setup bank account → `/bank-setup`
3. Add balance (for testing)
4. Create a course → `/instructor/add-course`
   - Upload course image
   - Set title, description, price
5. Wait for admin approval

### B. Admin Flow
1. Login as admin (use existing admin or create one)
2. View pending courses → `/admin/approve-courses`
3. Approve course and pay instructor (enter payment amount)
4. Verify course disappears from pending list
5. Check instructor's balance increased

### C. Learner Flow
1. Register as learner (Role: "learner")
2. Setup bank account → `/bank-setup`
3. Add balance → `/bank-setup` (amount ≥ course price)
4. Browse courses → `/courses`
5. Search for a course
6. Click course card to view details
7. Enroll in course (enter admin ID and secret key)
8. Wait for admin approval

### D. Admin Enrollment Approval
1. Login as admin
2. Navigate to `/admin/approve-enrollments`
3. Approve learner's enrollment
4. Verify enrollment disappears from pending

### E. Learner Verify Enrollment
1. Login back as learner
2. Navigate to `/my-courses`
3. Verify enrolled course appears
4. Click to view course materials

---

## Expected Database State

### After Complete Flow:

**Courses Collection**:
```javascript
{
  _id: "...",
  title: "Test Course",
  description: "...",
  price: 1000,
  isActive: true,  // After admin approval
  owner: instructorID
}
```

**Enroll Collection**:
```javascript
{
  _id: "...",
  courseID: courseID,
  learnerID: learnerID,
  paymentStatus: "paid",  // After admin approval
  enrollAt: Date,
  transactionID: "..."
}
```

**User Collection (Learner)**:
```javascript
{
  balance: originalBalance - coursePrice
}
```

**User Collection (Instructor)**:
```javascript
{
  balance: originalBalance + courseLaunchPayment
}
```

---

## Troubleshooting

### Issue: No courses showing in /courses
**Solution**: 
- Create at least one course as instructor
- Approve it as admin to make it active

### Issue: "No enrolled courses yet" in /my-courses
**Solution**:
- Enroll in a course via `/courses`
- Ensure admin approved the enrollment
- Check paymentStatus is "paid" in Enroll collection

### Issue: Empty pending courses list
**Solution**:
- Create a new course as instructor
- New courses default to isActive: false

### Issue: API returns 401 Unauthorized
**Solution**:
- Check if user is logged in
- Verify accessToken exists in localStorage
- Try logging out and back in

### Issue: CORS errors
**Solution**:
- Verify backend .env has CORS_ORIGIN: "http://localhost:3000"
- Restart backend server

---

## Quick Test Script

Run this in browser console after logging in as different users:

```javascript
// Check current user role
console.log('Current User:', JSON.parse(localStorage.getItem('user')));

// Instructor: Check if I have any courses
if (JSON.parse(localStorage.getItem('user')).Role === 'instructor') {
  fetch('http://localhost:8002/api/v1/course/allCourses', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  })
  .then(r => r.json())
  .then(data => {
    const myCourses = data.data.filter(c => c.owner._id === JSON.parse(localStorage.getItem('user'))._id);
    console.log('My Courses:', myCourses);
  });
}

// Learner: Check my enrollments
if (JSON.parse(localStorage.getItem('user')).Role === 'learner') {
  fetch('http://localhost:8002/api/v1/course/enrolledCourses', {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` }
  })
  .then(r => r.json())
  .then(data => console.log('My Enrolled Courses:', data.data));
}
```

---

## Success Criteria

✅ Courses page shows real data from backend  
✅ Pending courses visible to admin  
✅ Enrolled courses visible to learners after approval  
✅ Search and filters work on courses page  
✅ Course creation → approval → enrollment flow works end-to-end  
✅ No console errors or 404s  
✅ Loading states display correctly  
✅ Empty states show helpful messages  

---

## Admin Test Account

Make sure you have the admin ID ready:
- Check `Back-end/src/constant.js` for ADMIN_ID
- Use this ID when enrolling in courses
- Default from your code: `6931e0c79e0db4bfdba05543`
