# QuickHire - Modern Job Board Platform

A full-stack job board application built with Next.js, NestJS, and MongoDB. Features a pixel-perfect responsive design, advanced filtering, and a complete admin dashboard for job management.

![QuickHire](public/hero-header.png)

## ✨ Features

### Frontend
- 🎨 Pixel-perfect responsive design matching Figma specifications
- 🔍 Advanced job search with filters (category, type, location)
- 📱 Mobile-first approach with collapsible filter sections
- 💼 Featured and latest job sections
- 📝 Job application form with validation
- 🎯 Category-based job exploration
- 🏢 Company showcase section

### Backend
- 🚀 RESTful API built with NestJS
- 🗄️ MongoDB database with Mongoose ODM
- 📚 Swagger API documentation
- ✅ Input validation with class-validator
- 🔐 CORS enabled for frontend communication
- 📊 Admin dashboard with full CRUD operations

### Admin Dashboard
- 🔑 Password-protected access (password: `admin123`)
- ➕ Create, edit, and delete jobs
- 📈 Dashboard statistics (total, active, featured jobs)
- 🎛️ Dynamic form fields for responsibilities and requirements
- 🔄 Real-time updates with backend API

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Clash Display (headings), Epilogue (body)

### Backend
- **Framework:** NestJS
- **Database:** MongoDB
- **ODM:** Mongoose
- **Validation:** class-validator, class-transformer
- **Documentation:** Swagger/OpenAPI

## 📁 Project Structure

```
quickhire/
├── app/                          # Next.js app directory
│   ├── admin/                    # Admin dashboard
│   │   └── page.tsx             # Admin CRUD interface
│   ├── jobs/                     # Job pages
│   │   ├── page.tsx             # Job listing with filters
│   │   └── [id]/                # Dynamic job detail
│   │       └── page.tsx         # Single job view + apply form
│   ├── globals.css              # Global styles and Tailwind
│   ├── layout.tsx               # Root layout with metadata
│   └── page.tsx                 # Homepage
│
├── components/                   # React components
│   ├── Navbar.tsx               # Navigation bar
│   ├── Hero.tsx                 # Hero section with search
│   ├── CompaniesSection.tsx     # Partner companies
│   ├── CategorySection.tsx      # Job categories grid
│   ├── FeaturedJobsSection.tsx  # Featured jobs (API)
│   ├── LatestJobsSection.tsx    # Latest jobs (API)
│   ├── CTASection.tsx           # Call-to-action
│   └── Footer.tsx               # Footer with links
│
├── data/                         # Data files
│   └── all-jobs.json            # Initial seed data (20 jobs)
│
├── public/                       # Static assets
│   ├── icons/                   # Category icons
│   ├── *.svg                    # Company logos
│   └── *.png                    # Images
│
├── quickserver/                  # NestJS backend
│   ├── src/
│   │   ├── jobs/                # Jobs module
│   │   │   ├── dto/             # Data transfer objects
│   │   │   ├── schemas/         # Mongoose schemas
│   │   │   ├── jobs.controller.ts
│   │   │   ├── jobs.service.ts
│   │   │   └── jobs.module.ts
│   │   ├── applications/        # Applications module
│   │   │   ├── dto/
│   │   │   ├── schemas/
│   │   │   ├── applications.controller.ts
│   │   │   ├── applications.service.ts
│   │   │   └── applications.module.ts
│   │   ├── app.module.ts        # Root module
│   │   ├── app.controller.ts    # Health check
│   │   └── main.ts              # Bootstrap & Swagger
│   ├── seed-jobs.js             # Database seeding script
│   └── package.json
│
├── .env.local                    # Frontend environment variables
├── package.json                  # Frontend dependencies
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/You-sen/quickhire.git
   cd quickhire
   ```

2. **Install frontend dependencies**
   ```bash
   pnpm install
   ```

3. **Install backend dependencies**
   ```bash
   cd quickserver
   pnpm install
   cd ..
   ```

4. **Set up environment variables**

   **Frontend** (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   ```

   **Backend** (`quickserver/.env`):
   ```env
   MONGODB_URI=mongodb://localhost:27017/quickhire
   PORT=3001
   ```

5. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or use MongoDB Atlas (update MONGODB_URI in .env)
   ```

6. **Start the backend server**
   ```bash
   cd quickserver
   pnpm start:dev
   ```
   Backend runs on: `http://localhost:3001`
   Swagger docs: `http://localhost:3001/api-docs`

7. **Seed the database** (one-time)
   ```bash
   cd quickserver
   node seed-jobs.js
   ```
   This imports 20 sample jobs from `data/all-jobs.json`

8. **Start the frontend**
   ```bash
   # In the root directory
   pnpm dev
   ```
   Frontend runs on: `http://localhost:3000`

## 📖 Usage

### Public Pages

- **Homepage** (`/`) - Landing page with featured and latest jobs
- **Jobs Listing** (`/jobs`) - All jobs with filters
  - Filter by category: `/jobs?category=Design`
  - Filter by type: `/jobs?type=featured` or `/jobs?type=latest`
- **Job Detail** (`/jobs/[id]`) - Single job view with application form

### Admin Dashboard

- **URL:** `/admin`
- **Password:** `admin123`
- **Features:**
  - View dashboard statistics
  - Create new jobs
  - Edit existing jobs
  - Delete jobs
  - Search and filter jobs

## 🔌 API Endpoints

### Jobs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | Get all jobs (with filters) |
| GET | `/api/jobs/:id` | Get single job by ID |
| POST | `/api/jobs` | Create new job |
| PUT | `/api/jobs/:id` | Update job |
| DELETE | `/api/jobs/:id` | Delete job |
| GET | `/api/jobs/categories` | Get all categories |
| GET | `/api/jobs/locations` | Get all locations |

### Query Parameters

- `search` - Search in title, company, description
- `category` - Filter by category
- `location` - Filter by location

### Response Format

```json
{
  "success": true,
  "count": 20,
  "data": [...]
}
```

## 🎨 Design System

### Colors

- **Primary:** `#4640DE` (Blue)
- **Secondary:** `#26A4FF` (Light Blue)
- **Dark:** `#25324B`
- **Gray:** `#7C8493`
- **Background:** `#F8F8FD`

### Typography

- **Headings:** Clash Display (Semibold 600)
- **Body:** Epilogue (Regular 400, Medium 500, Semibold 600, Bold 700)

### Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1023px
- **Desktop:** ≥ 1024px

## 🧪 Development

### Frontend Development

```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Backend Development

```bash
cd quickserver
pnpm start:dev    # Start with hot reload
pnpm start        # Start production
pnpm build        # Build TypeScript
```

### Database Management

```bash
# Re-seed database
cd quickserver
node seed-jobs.js

# Clear all jobs (use admin dashboard or MongoDB shell)
```

## 📝 Adding New Jobs

### Via Admin Dashboard
1. Go to `/admin`
2. Enter password: `admin123`
3. Click "Add New Job"
4. Fill in all fields
5. Click "Create Job"

### Via API
```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Senior Developer",
    "company": "Tech Corp",
    "location": "Remote",
    "category": "Engineering",
    "description": "We are hiring...",
    "type": "Full-Time",
    "salary": "$100k - $150k",
    "isActive": true,
    "isFeatured": false
  }'
```

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `MONGODB_URI` in `quickserver/.env`
- Check if port 3001 is available

### Frontend can't fetch data
- Ensure backend is running on port 3001
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Verify CORS is enabled in backend

### Database is empty
- Run the seed script: `node quickserver/seed-jobs.js`
- Or add jobs via admin dashboard

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Design inspiration from modern job boards
- Icons from Lucide React
- Fonts from Fontshare (Clash Display) and Google Fonts (Epilogue)

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Next.js and NestJS
