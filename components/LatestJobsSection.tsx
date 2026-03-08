'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type?: string;
  isActive: boolean;
  postedDate?: string;
  createdAt?: string;
  logo?: string;
  logoColor?: string;
}

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  const categories = job.category.split(',').map(cat => cat.trim());
  
  return (
    <Link href={`/jobs/${job._id}`} className="bg-white rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer block">
      <div className="flex items-start gap-4">
        <div className={`w-16 h-16 ${job.logoColor || 'bg-gray-700'} rounded-lg flex items-center justify-center flex-shrink-0`}>
          <span className="text-2xl font-bold text-white">
            {job.company.charAt(0)}
          </span>
        </div>
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {job.title}
          </h3>
          
          <p className="text-gray-600 text-base mb-4">
            {job.company} · {job.location}
          </p>
          
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded text-sm font-medium border border-cyan-200">
              {job.type}
            </span>
            {categories.map((category, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded text-sm font-medium border ${
                  category === 'Marketing'
                    ? 'bg-white text-orange-600 border-orange-300'
                    : 'bg-white text-blue-600 border-blue-300'
                }`}
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function LatestJobsSection() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/jobs`);
      const result = await response.json();
      
      if (result.success) {
        // Get latest 8 active jobs (already sorted by createdAt desc from backend)
        const latestJobs = result.data.filter((job: Job) => job.isActive).slice(0, 8);
        setJobs(latestJobs);
      }
    } catch (error) {
      console.error('Error fetching latest jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative w-full overflow-hidden bg-[#f8f8fd] py-12 md:py-16 lg:py-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 lg:ml-[124px]">
          <div className="animate-pulse">
            <div className="h-10 lg:h-12 bg-gray-200 rounded w-64 lg:w-80 mb-6 lg:mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-28 lg:h-32 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative w-full overflow-hidden bg-[#f8f8fd] py-12 md:py-16 lg:py-[72px]"
    >
      {/* Background Pattern - Three rotated rectangles - hidden on mobile, visible on desktop */}
      <div className="hidden lg:block">
        {/* Rectangle 2734 */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '1260.75px',
            top: '-215.25px',
            width: '192.2px',
            height: '416.47px',
            backgroundColor: 'transparent',
            border: '4px solid #ccccf5',
            transform: 'rotate(-64deg)',
            transformOrigin: '0 0'
          }}
        />
        
        {/* Rectangle 2730 */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '1461.77px',
            top: '303px',
            width: '319.78px',
            height: '778.51px',
            backgroundColor: 'transparent',
            border: '4px solid #ccccf5',
            transform: 'rotate(-64deg)',
            transformOrigin: '0 0'
          }}
        />
        
        {/* Rectangle 2733 */}
        <div
          className="absolute pointer-events-none"
          style={{
            left: '1162.77px',
            top: '700px',
            width: '283.38px',
            height: '716.25px',
            backgroundColor: 'transparent',
            border: '4px solid #ccccf5',
            transform: 'rotate(-64deg)',
            transformOrigin: '0 0'
          }}
        />
      </div>

      {/* Content Container - responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 lg:ml-[124px]">
        {/* Title Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 lg:mb-12 gap-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[110%]" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            Latest <span className="text-blue-600">jobs open</span>
          </h2>
          {/* Show all jobs button - desktop only */}
          <Link href="/jobs?type=latest" className="hidden lg:flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm lg:text-base">
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

        {/* List Container - responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 lg:max-w-[1192px] pb-8 lg:pb-0">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>

        {/* Show all jobs button - mobile only, appears after job listings */}
        <div className="flex lg:hidden justify-center mt-8">
          <Link href="/jobs?type=latest" className="flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm">
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
