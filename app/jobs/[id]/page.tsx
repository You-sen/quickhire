'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  fullDescription?: string;
  responsibilities?: string[];
  requirements?: string[];
  type?: string;
  salary?: string;
  isActive: boolean;
  isFeatured?: boolean;
  postedDate?: string;
  logo?: string;
  logoColor?: string;
}

interface ApplicationForm {
  name: string;
  email: string;
  resumeUrl: string;
  coverNote: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const jobId = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    resumeUrl: '',
    coverNote: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
      const response = await fetch(`${apiUrl}/jobs/${jobId}`);
      const result = await response.json();
      
      if (result.success) {
        setJob(result.data);
      }
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Application submitted:', {
        jobId: job?._id,
        jobTitle: job?.title,
        ...formData
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowApplicationForm(false);
        setFormData({
          name: '',
          email: '',
          resumeUrl: '',
          coverNote: ''
        });
      }, 3000);
    }, 1500);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Job not found</h1>
            <button
              onClick={() => router.push('/jobs')}
              className="text-blue-600 hover:underline"
            >
              Back to jobs
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 md:mb-6 text-sm md:text-base"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to jobs
        </button>

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 md:p-8 mb-6">
              {/* Job Header */}
              <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-6 pb-6 border-b">
                <div className={`w-16 h-16 md:w-20 md:h-20 ${job.logoColor || 'bg-gray-700'} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {job.company.charAt(0)}
                  </span>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Clash Display, sans-serif' }}>
                    {job.title}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 mb-3 md:mb-4">
                    {job.company} · {job.location}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 md:px-4 py-1 md:py-2 bg-cyan-50 text-cyan-600 rounded text-xs md:text-sm font-medium border border-cyan-200">
                      {job.type}
                    </span>
                    <span className="px-3 md:px-4 py-1 md:py-2 bg-purple-50 text-purple-600 rounded text-xs md:text-sm font-medium border border-purple-200">
                      {job.category}
                    </span>
                    {job.salary && (
                      <span className="px-3 md:px-4 py-1 md:py-2 bg-green-50 text-green-600 rounded text-xs md:text-sm font-medium border border-green-200">
                        {job.salary}
                      </span>
                    )}
                    {job.isFeatured && (
                      <span className="px-3 md:px-4 py-1 md:py-2 bg-yellow-100 text-yellow-700 rounded text-xs md:text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">About the Role</h2>
                <div className="text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {job.fullDescription || job.description}
                </div>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-6 md:mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4">Requirements</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 md:gap-3">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-700 text-sm md:text-base">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 md:p-6 lg:sticky lg:top-4">
              {!showApplicationForm ? (
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-4">Interested in this role?</h3>
                  <button
                    onClick={() => setShowApplicationForm(true)}
                    className="w-full bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm md:text-base"
                  >
                    Apply Now
                  </button>
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3 text-sm md:text-base">Job Details</h4>
                    <div className="space-y-3 text-xs md:text-sm">
                      <div>
                        <span className="text-gray-600">Posted:</span>
                        <span className="ml-2 font-medium">
                          {job.postedDate ? new Date(job.postedDate).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Location:</span>
                        <span className="ml-2 font-medium">{job.location}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Job Type:</span>
                        <span className="ml-2 font-medium">{job.type}</span>
                      </div>
                      {job.salary && (
                        <div>
                          <span className="text-gray-600">Salary:</span>
                          <span className="ml-2 font-medium">{job.salary}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {submitSuccess ? (
                    <div className="text-center py-6 md:py-8">
                      <svg className="w-12 h-12 md:w-16 md:h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h3 className="text-lg md:text-xl font-semibold text-green-600 mb-2">Application Submitted!</h3>
                      <p className="text-gray-600 text-sm md:text-base">We'll review your application and get back to you soon.</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg md:text-xl font-semibold">Apply for this job</h3>
                        <button
                          onClick={() => setShowApplicationForm(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
                            placeholder="John Doe"
                          />
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                            Resume URL *
                          </label>
                          <input
                            type="url"
                            name="resumeUrl"
                            value={formData.resumeUrl}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base"
                            placeholder="https://drive.google.com/..."
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Link to your resume (Google Drive, Dropbox, etc.)
                          </p>
                        </div>

                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                            Cover Note *
                          </label>
                          <textarea
                            name="coverNote"
                            value={formData.coverNote}
                            onChange={handleInputChange}
                            required
                            rows={6}
                            className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none text-sm md:text-base"
                            placeholder="Tell us why you're a great fit for this role..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
                        >
                          {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </button>
                      </form>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
