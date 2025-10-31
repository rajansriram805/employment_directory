# Setup Guide

## Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file** in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/employment_directory
   JWT_SECRET=your_secret_key_here_change_in_production
   ```

3. **Start MongoDB** (if running locally):
   - Windows: Make sure MongoDB service is running
   - Mac/Linux: `sudo systemctl start mongod`
   - Or use MongoDB Atlas (cloud)

4. **Seed the database** with test users:
   ```bash
   npm run seed
   ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open** [http://localhost:3000](http://localhost:3000)

## Test Credentials

After running `npm run seed`, you can login with:

- **Admin**: admin@test.com / admin123
- **Job Seeker**: jobseeker@test.com / password123
- **Employer**: employer@test.com / password123

## Project Structure

```
├── app/
│   ├── api/              # Next.js API Routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── jobs/         # Job endpoints
│   │   └── applications/  # Application endpoints
│   ├── auth/             # Login/Register pages
│   ├── jobs/             # Job listing pages
│   └── dashboard/        # User dashboard
├── components/           # React components
├── lib/                 # Utilities (MongoDB, JWT)
├── models/              # Mongoose models
└── scripts/             # Utility scripts
```

## Features

✅ User Authentication (JWT)
✅ Job Listings
✅ Job Applications
✅ Role-based Access (Job Seeker, Employer, Admin)
✅ Responsive Design
✅ MongoDB Integration

