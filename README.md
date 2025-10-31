# 💼 Employment Directory

A modern full-stack web application connecting job seekers with employers. Built with Next.js, TypeScript, MongoDB, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7.8-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-38bdf8)

## ✨ Features

- 🔐 **User Authentication** - Secure registration and login with JWT
- 👥 **Multiple User Roles** - Job Seeker, Employer, and Admin
- 📋 **Job Listings** - Browse, search, and filter job opportunities
- 📝 **Job Applications** - Apply for jobs with cover letters
- 🏢 **Employer Dashboard** - Post and manage job openings
- 👤 **User Dashboard** - Track applications and profile
- 🔒 **Role-Based Access Control** - Secure endpoints and routes
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Fast & Modern** - Built with Next.js 14 App Router

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Context API** - State management

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing

### Database
- **MongoDB** - NoSQL database

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18+ installed
- **MongoDB** running locally or MongoDB Atlas account
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd employment-directory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
MONGODB_URI=mongodb://localhost:27017/employment_directory
JWT_SECRET=your_secret_key_here_change_in_production
```

**For MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employment_directory
```

### 4. Seed the Database

Create test users:

```bash
npm run seed
```

This creates:
- **Admin**: admin@test.com / admin123
- **Job Seeker**: jobseeker@test.com / password123
- **Employer**: employer@test.com / password123

### 5. Run Development Server

```bash
npm run dev
```

### 6. Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
employment-directory/
├── app/
│   ├── api/                  # API Routes
│   │   ├── auth/            # Authentication endpoints
│   │   ├── jobs/            # Job management
│   │   └── applications/    # Application endpoints
│   ├── auth/                # Login/Register pages
│   ├── jobs/                # Job listing pages
│   ├── dashboard/           # User dashboard
│   └── admin/               # Admin panel
├── components/              # React components
│   ├── AuthProvider.tsx     # Authentication context
│   └── Navbar.tsx           # Navigation bar
├── lib/                     # Utilities
│   ├── mongodb.ts           # Database connection
│   └── jwt.ts               # JWT helpers
├── models/                  # Mongoose models
│   ├── User.ts
│   ├── Job.ts
│   └── Application.ts
├── scripts/                 # Utility scripts
│   └── seed.js             # Database seeding
└── public/                  # Static assets
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Jobs
- `GET /api/jobs` - Get all jobs (with search/filter)
- `POST /api/jobs` - Create job (Employer only)
- `GET /api/jobs/[id]` - Get job details

### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - Get user's applications

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation.

## 🎯 User Roles

### Job Seeker
- Browse and search jobs
- Apply for jobs
- View application status
- Manage profile

### Employer
- Post job openings
- View applications for posted jobs
- Manage job listings
- Review applicants

### Admin
- Access admin panel
- Manage platform
- View all data

## 🔐 Security Features

- **Password Hashing** - bcrypt with 10 rounds
- **JWT Authentication** - Secure token-based auth
- **Protected Routes** - Role-based access control
- **Input Validation** - Client and server-side validation
- **Secure Headers** - CORS and security headers

## 🧪 Testing

### Test Credentials

After running `npm run seed`, use these accounts:

**Admin:**
- Email: `admin@test.com`
- Password: `admin123`

**Job Seeker:**
- Email: `jobseeker@test.com`
- Password: `password123`

**Employer:**
- Email: `employer@test.com`
- Password: `password123`

## 📦 Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Other Platforms

The app can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Render**
- Any Node.js hosting platform

Make sure to set environment variables in your hosting platform.

## 🐛 Troubleshooting

### MongoDB Connection Issues

1. **Local MongoDB:**
   - Ensure MongoDB service is running
   - Check connection string in `.env`

2. **MongoDB Atlas:**
   - Verify connection string
   - Check IP whitelist settings
   - Verify credentials

### Port Already in Use

Change the port:
```bash
PORT=3001 npm run dev
```

## 📖 Documentation

- [Project Report](./PROJECT_REPORT.md) - Complete project documentation
- [API Documentation](./API_DOCUMENTATION.md) - Detailed API reference
- [Challenges & Solutions](./CHALLENGES_AND_SOLUTIONS.md) - Problem-solving documentation
- [Setup Guide](./SETUP.md) - Detailed setup instructions

## 🔮 Future Enhancements

- [ ] Email notifications
- [ ] Resume upload functionality
- [ ] Advanced search and filters
- [ ] Job categories and tags
- [ ] User profiles with skills
- [ ] Messaging system
- [ ] Analytics dashboard
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database
- Tailwind CSS for the styling framework
- All open-source contributors

---

**Made with ❤️ using Next.js and MongoDB**

For questions or support, please open an issue on GitHub.
