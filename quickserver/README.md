# QuickHire Backend API

A RESTful API built with NestJS and MongoDB for the QuickHire job board application.

## Features

- Job listings management (CRUD operations)
- Job search and filtering by category/location
- Job application submission
- Input validation
- MongoDB integration with Mongoose
- CORS enabled for frontend integration
- Clean architecture with modular design

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB (MongoDB Atlas)
- **ODM**: Mongoose
- **Validation**: class-validator, class-transformer
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (connection string provided)

## Installation

1. Navigate to the quickserver directory:
```bash
cd quickserver
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your MongoDB connection string:
```
PORT=3001
MONGODB_URI=your_mongodb_connection_string_here
NODE_ENV=development
```

## Running the Application

### Development mode (with hot reload):
```bash
npm run start:dev
```

### Production mode:
```bash
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3001/api`

## API Endpoints

### Health Check
- `GET /api` - Check API status

### Jobs
- `GET /api/jobs` - Get all jobs (with optional filters)
  - Query params: `search`, `category`, `location`
- `GET /api/jobs/:id` - Get single job by ID
- `POST /api/jobs` - Create new job (Admin)
- `PUT /api/jobs/:id` - Update job (Admin)
- `DELETE /api/jobs/:id` - Delete job (Admin)
- `GET /api/jobs/categories` - Get all unique categories
- `GET /api/jobs/locations` - Get all unique locations

### Applications
- `GET /api/applications` - Get all applications
  - Query params: `jobId` (optional)
- `GET /api/applications/:id` - Get single application
- `POST /api/applications` - Submit job application
- `DELETE /api/applications/:id` - Delete application (Admin)

## Request/Response Examples

### Create Job
```bash
POST /api/jobs
Content-Type: application/json

{
  "title": "Senior Frontend Developer",
  "company": "Tech Corp",
  "location": "Remote",
  "category": "Engineering",
  "description": "We are looking for an experienced frontend developer...",
  "salary": "$100k - $150k",
  "type": "Full-time"
}
```

### Submit Application
```bash
POST /api/applications
Content-Type: application/json

{
  "jobId": "65f1234567890abcdef12345",
  "name": "John Doe",
  "email": "john@example.com",
  "resumeLink": "https://example.com/resume.pdf",
  "coverNote": "I am very interested in this position..."
}
```

### Search Jobs
```bash
GET /api/jobs?search=developer&category=Engineering&location=Remote
```

## Database Models

### Job Schema
```typescript
{
  title: string (required)
  company: string (required)
  location: string (required)
  category: string (required)
  description: string (required)
  salary: string (optional)
  type: string (optional)
  isActive: boolean (default: true)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### Application Schema
```typescript
{
  jobId: ObjectId (required, ref: Job)
  name: string (required)
  email: string (required)
  resumeLink: string (required, URL)
  coverNote: string (required)
  status: string (default: 'pending')
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## Validation Rules

- All required fields must be provided
- Email must be valid format
- Resume link must be valid URL
- Job ID must be valid MongoDB ObjectId
- Empty strings not allowed for required fields

## Project Structure

```
quickserver/
├── src/
│   ├── applications/
│   │   ├── dto/
│   │   │   └── create-application.dto.ts
│   │   ├── schemas/
│   │   │   └── application.schema.ts
│   │   ├── applications.controller.ts
│   │   ├── applications.service.ts
│   │   └── applications.module.ts
│   ├── jobs/
│   │   ├── dto/
│   │   │   ├── create-job.dto.ts
│   │   │   └── update-job.dto.ts
│   │   ├── schemas/
│   │   │   └── job.schema.ts
│   │   ├── jobs.controller.ts
│   │   ├── jobs.service.ts
│   │   └── jobs.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── .env
├── .env.example
├── nest-cli.json
├── package.json
├── tsconfig.json
└── README.md
```

## Error Handling

The API returns consistent error responses:

```json
{
  "statusCode": 404,
  "message": "Job with ID xyz not found",
  "error": "Not Found"
}
```

## CORS Configuration

CORS is enabled for:
- `http://localhost:3000` (Next.js frontend)
- `http://localhost:3001` (API)

## Development Notes

- Uses NestJS decorators for clean, declarative code
- Implements DTOs for request validation
- Mongoose schemas with TypeScript types
- Global validation pipe for automatic validation
- Modular architecture for scalability
- Follows NestJS best practices and conventions

## Future Enhancements

- Authentication & Authorization (JWT)
- File upload for resumes
- Email notifications
- Admin dashboard endpoints
- Pagination for large datasets
- Rate limiting
- API documentation with Swagger
- Unit and E2E tests

## License

ISC
