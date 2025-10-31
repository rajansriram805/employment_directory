const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env' })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employment_directory'

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  profile: {
    phone: String,
    address: String,
    skills: [String],
    experience: String,
    resume: String
  }
}, { timestamps: true })

// Job Schema
const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  company: String,
  location: String,
  salary: String,
  type: String,
  requirements: [String],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
}, { timestamps: true })

// Application Schema
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'pending' },
  coverLetter: String
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)
const Job = mongoose.models.Job || mongoose.model('Job', jobSchema)
const Application = mongoose.models.Application || mongoose.model('Application', applicationSchema)

async function seed() {
  try {
    console.log('⏳ Connecting to MongoDB Atlas...')
    await mongoose.connect(MONGODB_URI)
    console.log('✓ Connected to MongoDB\n')

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...')
    await User.deleteMany({})
    await Job.deleteMany({})
    await Application.deleteMany({})
    console.log('✓ Cleared existing data\n')

    // Create Users
    console.log('👥 Creating users...')
    
    // Admin user
    const adminPassword = await bcrypt.hash('admin123', 10)
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@test.com',
      password: adminPassword,
      role: 'admin',
      profile: {
        phone: '+1-555-0100',
        address: '123 Admin Street, Admin City'
      }
    })
    console.log('✓ Created admin: admin@test.com / admin123')

    // Job Seekers
    const seeker1Password = await bcrypt.hash('password123', 10)
    const seeker1 = await User.create({
      name: 'John Doe',
      email: 'jobseeker@test.com',
      password: seeker1Password,
      role: 'job_seeker',
      profile: {
        phone: '+1-555-0101',
        address: '456 Job Seeker Ave, City',
        skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        experience: '3 years of web development experience'
      }
    })
    console.log('✓ Created job seeker: jobseeker@test.com / password123')

    const seeker2Password = await bcrypt.hash('password123', 10)
    const seeker2 = await User.create({
      name: 'Sarah Smith',
      email: 'sarah@test.com',
      password: seeker2Password,
      role: 'job_seeker',
      profile: {
        phone: '+1-555-0102',
        address: '789 Developer Road, Tech City',
        skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
        experience: '5 years of backend development'
      }
    })
    console.log('✓ Created job seeker: sarah@test.com / password123')

    const seeker3Password = await bcrypt.hash('password123', 10)
    const seeker3 = await User.create({
      name: 'Mike Johnson',
      email: 'mike@test.com',
      password: seeker3Password,
      role: 'job_seeker',
      profile: {
        phone: '+1-555-0103',
        address: '321 Designer Street, Creative City',
        skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'CSS'],
        experience: '4 years of design experience'
      }
    })
    console.log('✓ Created job seeker: mike@test.com / password123')

    // Employers
    const employer1Password = await bcrypt.hash('password123', 10)
    const employer1 = await User.create({
      name: 'Jane Employer',
      email: 'employer@test.com',
      password: employer1Password,
      role: 'employer',
      profile: {
        phone: '+1-555-0200',
        address: '100 Business Blvd, Corporate City'
      }
    })
    console.log('✓ Created employer: employer@test.com / password123')

    const employer2Password = await bcrypt.hash('password123', 10)
    const employer2 = await User.create({
      name: 'Tech Corp HR',
      email: 'techcorp@test.com',
      password: employer2Password,
      role: 'employer',
      profile: {
        phone: '+1-555-0201',
        address: '200 Tech Park, Silicon Valley'
      }
    })
    console.log('✓ Created employer: techcorp@test.com / password123')

    const employer3Password = await bcrypt.hash('password123', 10)
    const employer3 = await User.create({
      name: 'Innovation Labs',
      email: 'innovation@test.com',
      password: employer3Password,
      role: 'employer',
      profile: {
        phone: '+1-555-0202',
        address: '300 Innovation Drive, Startup City'
      }
    })
    console.log('✓ Created employer: innovation@test.com / password123')

    // Create Jobs
    console.log('\n💼 Creating job postings...')

    const job1 = await Job.create({
      title: 'Senior Full Stack Developer',
      description: 'We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies. The ideal candidate should have strong problem-solving skills and the ability to work in a fast-paced environment.',
      company: 'Tech Corp',
      location: 'New York, NY',
      salary: '$80,000 - $120,000',
      type: 'full-time',
      requirements: [
        '5+ years of experience in web development',
        'Proficiency in JavaScript, React, and Node.js',
        'Experience with MongoDB or similar databases',
        'Strong understanding of RESTful APIs',
        'Experience with version control (Git)'
      ],
      employer: employer1._id
    })
    console.log(`✓ Created job: ${job1.title} at ${job1.company}`)

    const job2 = await Job.create({
      title: 'Junior Frontend Developer',
      description: 'An exciting opportunity for a Junior Frontend Developer to kickstart their career. You will work with our senior developers to build beautiful and responsive user interfaces. We offer mentorship and growth opportunities.',
      company: 'Tech Corp',
      location: 'Remote',
      salary: '$50,000 - $70,000',
      type: 'full-time',
      requirements: [
        '1-2 years of experience or relevant coursework',
        'Knowledge of HTML, CSS, and JavaScript',
        'Familiarity with React or Vue.js',
        'Good communication skills',
        'Willingness to learn and grow'
      ],
      employer: employer1._id
    })
    console.log(`✓ Created job: ${job2.title} at ${job2.company}`)

    const job3 = await Job.create({
      title: 'Backend Developer (Python)',
      description: 'Join our backend team to build scalable and efficient server-side applications. We use Python, Django, and PostgreSQL. You will work on API development, database design, and system architecture.',
      company: 'Innovation Labs',
      location: 'San Francisco, CA',
      salary: '$90,000 - $130,000',
      type: 'full-time',
      requirements: [
        '4+ years of Python development experience',
        'Strong knowledge of Django or Flask',
        'Experience with PostgreSQL or MySQL',
        'Understanding of RESTful API design',
        'Experience with AWS or cloud platforms'
      ],
      employer: employer3._id
    })
    console.log(`✓ Created job: ${job3.title} at ${job3.company}`)

    const job4 = await Job.create({
      title: 'UI/UX Designer',
      description: 'We are seeking a creative UI/UX Designer to design intuitive and engaging user experiences. You will collaborate with developers and product managers to create wireframes, prototypes, and design systems.',
      company: 'Innovation Labs',
      location: 'Remote',
      salary: '$60,000 - $85,000',
      type: 'part-time',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma, Adobe XD, or Sketch',
        'Strong portfolio demonstrating design skills',
        'Understanding of user-centered design principles',
        'Experience with responsive design'
      ],
      employer: employer3._id
    })
    console.log(`✓ Created job: ${job4.title} at ${job4.company}`)

    const job5 = await Job.create({
      title: 'DevOps Engineer',
      description: 'Looking for a DevOps Engineer to manage our cloud infrastructure and CI/CD pipelines. You will work with Docker, Kubernetes, and AWS to ensure smooth deployments and system reliability.',
      company: 'Tech Corp',
      location: 'Austin, TX',
      salary: '$100,000 - $140,000',
      type: 'full-time',
      requirements: [
        '5+ years of DevOps experience',
        'Strong knowledge of Docker and Kubernetes',
        'Experience with AWS, Azure, or GCP',
        'Knowledge of CI/CD tools (Jenkins, GitHub Actions)',
        'Scripting skills (Bash, Python)'
      ],
      employer: employer1._id
    })
    console.log(`✓ Created job: ${job5.title} at ${job5.company}`)

    const job6 = await Job.create({
      title: 'React Developer Intern',
      description: 'Summer internship opportunity for a React Developer. Learn from experienced developers while working on real projects. This is a paid internship with potential for full-time employment.',
      company: 'Innovation Labs',
      location: 'Boston, MA',
      salary: '$25,000 - $30,000',
      type: 'internship',
      requirements: [
        'Currently pursuing Computer Science degree',
        'Basic knowledge of React and JavaScript',
        'Strong willingness to learn',
        'Good problem-solving skills'
      ],
      employer: employer3._id
    })
    console.log(`✓ Created job: ${job6.title} at ${job6.company}`)

    // Create Applications
    console.log('\n📝 Creating job applications...')

    const app1 = await Application.create({
      job: job1._id,
      applicant: seeker1._id,
      status: 'pending',
      coverLetter: 'Dear Hiring Manager, I am writing to express my interest in the Senior Full Stack Developer position. With 3 years of experience in JavaScript, React, and Node.js, I believe I would be a great fit for your team. I am excited about the opportunity to contribute to Tech Corp.'
    })
    console.log(`✓ ${seeker1.name} applied for ${job1.title}`)

    const app2 = await Application.create({
      job: job1._id,
      applicant: seeker2._id,
      status: 'reviewed',
      coverLetter: 'I am interested in the Senior Full Stack Developer role. My 5 years of backend development experience, combined with my knowledge of modern web technologies, makes me an ideal candidate for this position.'
    })
    console.log(`✓ ${seeker2.name} applied for ${job1.title}`)

    const app3 = await Application.create({
      job: job3._id,
      applicant: seeker2._id,
      status: 'shortlisted',
      coverLetter: 'I am excited to apply for the Backend Developer position. My extensive experience with Python and Django aligns perfectly with your requirements. I am looking forward to discussing how I can contribute to Innovation Labs.'
    })
    console.log(`✓ ${seeker2.name} applied for ${job3.title}`)

    const app4 = await Application.create({
      job: job4._id,
      applicant: seeker3._id,
      status: 'pending',
      coverLetter: 'As a UI/UX Designer with 4 years of experience, I am thrilled to apply for this position. I have a passion for creating intuitive user experiences and would love to bring my creativity to Innovation Labs.'
    })
    console.log(`✓ ${seeker3.name} applied for ${job4.title}`)

    const app5 = await Application.create({
      job: job2._id,
      applicant: seeker1._id,
      status: 'pending',
      coverLetter: 'I am a recent graduate with a strong interest in frontend development. Although I am applying for a junior position, I am eager to learn and grow with your team. I have completed several projects using React and JavaScript.'
    })
    console.log(`✓ ${seeker1.name} applied for ${job2.title}`)

    // Update jobs with applications
    await Job.findByIdAndUpdate(job1._id, { $push: { applications: [app1._id, app2._id] } })
    await Job.findByIdAndUpdate(job2._id, { $push: { applications: app5._id } })
    await Job.findByIdAndUpdate(job3._id, { $push: { applications: app3._id } })
    await Job.findByIdAndUpdate(job4._id, { $push: { applications: app4._id } })

    console.log('\n✅ Seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`   - Users created: ${await User.countDocuments()}`)
    console.log(`   - Jobs created: ${await Job.countDocuments()}`)
    console.log(`   - Applications created: ${await Application.countDocuments()}`)
    console.log('\n🔑 Test Credentials:')
    console.log('   Admin: admin@test.com / admin123')
    console.log('   Job Seeker: jobseeker@test.com / password123')
    console.log('   Employer: employer@test.com / password123')
    
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('\n✗ Seeding error:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

seed()
