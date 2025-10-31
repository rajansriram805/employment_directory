const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env' })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/employment_directory'

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✓ Connected to MongoDB')

    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@test.com' })
    if (!adminExists) {
      const adminPassword = await bcrypt.hash('admin123', 10)
      await User.create({
        name: 'Admin User',
        email: 'admin@test.com',
        password: adminPassword,
        role: 'admin'
      })
      console.log('✓ Created admin user: admin@test.com / admin123')
    }

    // Create job seeker
    const seekerExists = await User.findOne({ email: 'jobseeker@test.com' })
    if (!seekerExists) {
      const seekerPassword = await bcrypt.hash('password123', 10)
      await User.create({
        name: 'John Doe',
        email: 'jobseeker@test.com',
        password: seekerPassword,
        role: 'job_seeker'
      })
      console.log('✓ Created job seeker: jobseeker@test.com / password123')
    }

    // Create employer
    const employerExists = await User.findOne({ email: 'employer@test.com' })
    if (!employerExists) {
      const employerPassword = await bcrypt.hash('password123', 10)
      await User.create({
        name: 'Jane Employer',
        email: 'employer@test.com',
        password: employerPassword,
        role: 'employer'
      })
      console.log('✓ Created employer: employer@test.com / password123')
    }

    console.log('\n✓ Seeding completed!')
    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('✗ Seeding error:', error)
    process.exit(1)
  }
}

seed()

