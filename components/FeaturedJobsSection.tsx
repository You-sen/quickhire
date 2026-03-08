'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  type?: string;
  salary?: string;
  isActive: boolean;
  isFeatured?: boolean;
  postedDate?: string;
  logo?: string;
  logoColor?: string;
}

interface JobCardProps {
  job: Job;
}

// Company logo colors mapping
const companyColors: Record<string, string> = {
  'Revolut': 'bg-gray-900',
  'Dropbox': 'bg-blue-500',
  'Pitch': 'bg-black',
  'Blinkist': 'bg-green-500',
  'ClassPass': 'bg-blue-600',
  'Canva': 'bg-cyan-400',
  'GoDaddy': 'bg-black',
  'Twitter': 'bg-blue-400',
};

const JobCard = ({ job }: JobCardProps) => {
  const categories = job.category.split(',').map(cat => cat.trim());
  const logoColor = companyColors[job.company] || job.logoColor || 'bg-gray-700';
  
  return (
    <Link href={`/jobs/${job._id}`} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer block">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 ${logoColor} rounded-full flex items-center justify-center`}>
          <span className="text-xl font-bold text-white">
            {job.company.charAt(0)}
          </span>
        </div>
        {job.type && (
          <span className="px-4 py-1 border border-blue-600 text-blue-600 rounded text-sm font-semibold">
            {job.type}
          </span>
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {job.title}
      </h3>
      
      <p className="text-gray-600 text-sm mb-4">
        {job.company} · {job.location}
      </p>
      
      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
        {job.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => (
          <span
            key={index}
            className={`px-3 py-1 rounded text-sm font-medium ${
              category === 'Marketing'
                ? 'bg-orange-50 text-orange-600'
                : category === 'Design'
                ? 'bg-cyan-50 text-cyan-600'
                : category === 'Business'
                ? 'bg-purple-50 text-purple-600'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {category}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default function FeaturedJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://quickhire-six.vercel.app/api';
      console.log('🔗 [FeaturedJobs] Fetching from:', apiUrl);
      const response = await fetch(`${apiUrl}/jobs`);
      const result = await response.json();
      
      if (result.success) {
        // Filter only featured jobs
        const featuredJobs = result.data.filter((job: Job) => job.isFeatured && job.isActive);
        setJobs(featuredJobs);
      }
    } catch (error) {
      console.error('❌ [FeaturedJobs] Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 lg:h-12 bg-gray-200 rounded w-48 lg:w-64 mb-6 lg:mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-56 lg:h-64 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 lg:mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[110%]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Featured <span className="text-blue-600">jobs</span>
          </h2>
          {/* Show all jobs button - desktop only */}
          <Link href="/jobs?type=featured" className="hidden lg:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm lg:text-base">
            Show all jobs
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {jobs.slice(0, 8).map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/* Show all jobs button - mobile only, appears after job listings */}
        <div className="flex lg:hidden justify-center mt-8">
          <Link href="/jobs?type=featured" className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm">
            Show all jobs
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
