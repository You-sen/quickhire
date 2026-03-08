'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

function JobsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const typeParam = searchParams.get('type'); // 'featured' or 'latest'

  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [isJobTypeOpen, setIsJobTypeOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Design', 'Engineering', 'Marketing', 'Technology', 'Business', 'Sales', 'Human Resource', 'Finance'];
  const jobTypes = ['All', 'Full-Time', 'Part-Time', 'Contract', 'Internship'];

  useEffect(() => {
    fetchJobs();
  }, [typeParam, categoryParam]);

  const fetchJobs = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/jobs`);
      const result = await response.json();
      
      if (result.success) {
        let filtered = result.data.filter((job: Job) => job.isActive);
        
        // Filter based on URL params
        if (typeParam === 'featured') {
          filtered = filtered.filter((job: Job) => job.isFeatured);
        } else if (typeParam === 'latest') {
          // Already sorted by createdAt desc from backend
          filtered = filtered.slice(0, 20);
        }
        
        setJobs(filtered);
        setFilteredJobs(filtered);
        
        // Set selected category from URL param
        if (categoryParam) {
          const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
          setSelectedCategory(formattedCategory);
        }
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = jobs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // Filter by job type
    if (selectedType !== 'All') {
      filtered = filtered.filter(job => job.type === selectedType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  }, [selectedCategory, selectedType, searchQuery, jobs]);

  const JobCard = ({ job }: { job: Job }) => {
    return (
      <Link href={`/jobs/${job._id}`} className="bg-white border border-gray-200 rounded-lg p-4 md:p-6 hover:shadow-lg transition-shadow cursor-pointer block">
        <div className="flex items-start gap-3 md:gap-4">
          <div className={`w-12 h-12 md:w-16 md:h-16 ${job.logoColor || 'bg-gray-700'} rounded-lg flex items-center justify-center flex-shrink-0`}>
            <span className="text-lg md:text-2xl font-bold text-white">
              {job.company.charAt(0)}
            </span>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
              <div className="min-w-0">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-1 truncate">
                  {job.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 truncate">
                  {job.company} · {job.location}
                </p>
              </div>
              {job.isFeatured && (
                <span className="px-2 md:px-3 py-1 bg-yellow-100 text-yellow-700 rounded text-xs md:text-sm font-medium whitespace-nowrap self-start">
                  Featured
                </span>
              )}
            </div>
            
            <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2">
              {job.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 md:px-3 py-1 bg-cyan-50 text-cyan-600 rounded text-xs md:text-sm font-medium border border-cyan-200">
                {job.type}
              </span>
              <span className="px-2 md:px-3 py-1 bg-purple-50 text-purple-600 rounded text-xs md:text-sm font-medium border border-purple-200">
                {job.category}
              </span>
              {job.salary && (
                <span className="px-2 md:px-3 py-1 bg-green-50 text-green-600 rounded text-xs md:text-sm font-medium border border-green-200">
                  {job.salary}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
            {typeParam === 'featured' ? 'Featured Jobs' : typeParam === 'latest' ? 'Latest Jobs' : 'All Jobs'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 md:p-6 lg:sticky lg:top-4">
              <h2 className="text-base md:text-lg font-semibold mb-4">Filters</h2>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  placeholder="Job title, company..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
                />
              </div>

              {/* Category Filter - Collapsible */}
              <div className="mb-6">
                <button
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-700 mb-2 hover:text-gray-900"
                >
                  <span>Category</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isCategoryOpen && (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`w-full text-left px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                          selectedCategory === category
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Job Type Filter - Collapsible */}
              <div>
                <button
                  onClick={() => setIsJobTypeOpen(!isJobTypeOpen)}
                  className="w-full flex items-center justify-between text-sm font-medium text-gray-700 mb-2 hover:text-gray-900"
                >
                  <span>Job Type</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isJobTypeOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isJobTypeOpen && (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {jobTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`w-full text-left px-3 md:px-4 py-2 rounded-lg transition-colors text-sm md:text-base ${
                          selectedType === type
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedType('All');
                  setSearchQuery('');
                }}
                className="w-full mt-6 px-3 md:px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm md:text-base"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg p-8 md:p-12 text-center">
                <p className="text-gray-500 text-base md:text-lg">No jobs found matching your criteria.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function JobsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
          <div className="text-center">Loading...</div>
        </div>
        <Footer />
      </div>
    }>
      <JobsContent />
    </Suspense>
  );
}
