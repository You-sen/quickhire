# Admin Dashboard Setup Guide

## Overview
The admin dashboard allows you to manage job postings with full CRUD operations (Create, Read, Update, Delete). It connects to the NestJS backend API for data persistence.

## Features
- Role-based authentication (simple password protection)
- Dashboard statistics (total, active, featured, inactive jobs)
- Add new job postings with all fields
- Edit existing jobs
- Delete jobs
- Search and filter jobs
- Dynamic responsibilities and requirements lists
- Real-time updates from backend API

## Setup Instructions

### 1. Backend Setup (NestJS API)

First, set up and start the backend server:

```bash
# Navigate to backend directory
cd quickserver

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and add your MongoDB connection string

# Start the backend server
npm run start:dev
```

The backend API will run on `http://localhost:3001/api`

### 2. Frontend Setup (Next.js)

Configure the frontend to connect to the backend:

```bash
# In the root directory, create .env.local
cp .env.local.example .env.local

# The file should contain:
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 3. Start the Frontend

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3000`

## Using the Admin Dashboard

### 1. Access the Dashboard

Navigate to: `http://localhost:3000/admin`

### 2. Login

- Default password: `admin123`
- The password is stored in localStorage for the session

### 3. Dashboard Features

#### Statistics Cards
- Total Jobs: All jobs in the database
- Active Jobs: Jobs with isActive = true
- Featured Jobs: Jobs with isFeatured = true
- Inactive Jobs: Jobs with isActive = false

#### Add New Job
1. Click "Add New Job" button
2. Fill in all required fields:
   - Job Title *
   - Company *
   - Location *
   - Category * (dropdown)
   - Job Type * (dropdown)
   - Salary (optional)
   - Logo Color (dropdown)
   - Short Description *
   - Full Description (optional)
   - Responsibilities (dynamic list)
   - Requirements (dynamic list)
   - Active checkbox
   - Featured checkbox
3. Click "Create Job"

#### Edit Job
1. Find the job in the table
2. Click "Edit" button
3. Modify the fields
4. Click "Update Job"

#### Delete Job
1. Find the job in the table
2. Click "Delete" button
3. Confirm the deletion

#### Search Jobs
Use the search bar to filter jobs by:
- Job title
- Company name
- Category

## API Endpoints Used

The admin dashboard connects to these backend endpoints:

- `GET /api/jobs` - Fetch all jobs
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

## Job Data Structure

```typescript
interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  fullDescription?: string;
  responsibilities?: string[];
  requirements?: string[];
  type?: string;
  salary?: string;
  isActive: boolean;
  isFeatured?: boolean;
  postedDate?: string;
  logo?: string;
  logoColor?: string;
}
```

## Categories Available
- Design
- Marketing
- Engineering
- Technology
- Business
- Sales
- Human Resource
- Finance

## Job Types Available
- Full-Time
- Part-Time
- Contract
- Internship

## Logo Colors Available
- Gray (bg-gray-700)
- Blue (bg-blue-500)
- Green (bg-green-500)
- Red (bg-red-500)
- Purple (bg-purple-500)
- Yellow (bg-yellow-500)
- Cyan (bg-cyan-400)
- Black (bg-black)

## Security Notes

⚠️ **Important**: The current authentication is for demonstration purposes only. For production:

1. Implement proper authentication (JWT, OAuth, etc.)
2. Add role-based access control
3. Secure API endpoints with authentication middleware
4. Use environment variables for sensitive data
5. Implement rate limiting
6. Add CSRF protection
7. Use HTTPS in production

## Troubleshooting

### Backend not connecting
- Ensure MongoDB is running and connection string is correct
- Check if backend is running on port 3001
- Verify CORS is enabled in backend

### Frontend API errors
- Check `.env.local` has correct API URL
- Ensure backend is running before starting frontend
- Check browser console for error messages

### Data not persisting
- Verify MongoDB connection is working
- Check backend logs for errors
- Ensure all required fields are provided

## Next Steps

To enhance the admin dashboard:

1. Add user authentication system
2. Implement file upload for company logos
3. Add pagination for large datasets
4. Add bulk operations (delete multiple, export)
5. Add analytics and reporting
6. Implement audit logs
7. Add email notifications
8. Create different admin roles (super admin, editor, viewer)

## Support

For issues or questions:
1. Check backend logs: `quickserver/` directory
2. Check frontend console in browser DevTools
3. Verify all environment variables are set correctly
4. Ensure all dependencies are installed
