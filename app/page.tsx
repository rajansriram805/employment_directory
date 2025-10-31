import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Find Your Dream Job
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Connect with employers and discover opportunities
        </p>
        <div className="space-x-4">
          <Link
            href="/jobs"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block"
          >
            Browse Jobs
          </Link>
          <Link
            href="/auth/register"
            className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 inline-block"
          >
            Get Started
          </Link>
        </div>
      </div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">For Job Seekers</h3>
          <p className="text-gray-600">
            Search and apply for jobs that match your skills and interests.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">For Employers</h3>
          <p className="text-gray-600">
            Post job openings and find the perfect candidates for your company.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Easy Application</h3>
          <p className="text-gray-600">
            Simple and streamlined application process for everyone.
          </p>
        </div>
      </div>
    </div>
  )
}

