# Quick Reference - Admin ID

## Current Admin ID
```
693a58d93cb728332626f9a2
```

This ID is defined in:
- **Backend**: `/Back-end/src/constant.js`
- **Frontend**: `/Front-end/src/pages/CourseDetail.jsx`

## Important Notes

1. **Must Match**: The admin ID in frontend MUST match the one in backend constant.js
2. **Used For**: Course enrollment - learners need to provide admin ID when enrolling
3. **Admin User**: This ID must exist in MongoDB Users collection with `Role: "admin"`

## How to Find Your Admin ID

### Method 1: Check Backend Constant
```bash
cat Back-end/src/constant.js
```

### Method 2: MongoDB Query
```javascript
// In MongoDB shell or Compass
db.users.findOne({ Role: "admin" })
```

### Method 3: After Login
When admin logs in, the console shows:
```
AccessToken : ...
Log in succesfully! 
<ADMIN_ID_HERE>
```

## If Admin Doesn't Exist

Create an admin user by registering with `Role: "admin"` in the registration endpoint, or update an existing user:

```javascript
// MongoDB shell
db.users.updateOne(
  { Email: "admin@example.com" },
  { $set: { Role: "admin" } }
)
```

## Enrollment Flow
```
Learner → Selects Course → Clicks Enroll
    ↓
Pays course price from balance
    ↓
Money goes to Admin account (adminID)
    ↓
Enrollment status: "pending"
    ↓
Admin approves enrollment
    ↓
Admin pays instructor
    ↓
Enrollment status: "paid"
    ↓
Course appears in Learner's "My Courses"
```
