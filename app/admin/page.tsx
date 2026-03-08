'use client';

import { useEffect, useState } from 'react';
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

interface JobFormData {
  title: string;
  company: string;
  location: string;
  category: string;
  description: string;
  fullDescription: string;
  responsibilities: string[];
  requirements: string[];
  type: string;
  salary: string;
  isActive: boolean;
  isFeatured: boolean;
  logoColor: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<JobFormData>({
    title: '',
    company: '',
    location: '',
    category: 'Design',
    description: '',
    fullDescription: '',
    responsibilities: [''],
    requirements: [''],
    type: 'Full-Time',
    salary: '',
    isActive: true,
    isFeatured: false,
    logoColor: 'bg-gray-700'
  });

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchJobs();
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      localStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      fetchJobs();
    } else {
      showAlert('error', 'Invalid password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
    setPassword('');
  };

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/jobs`);
      const data = await response.json();
      setJobs(data.data || data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      showAlert('error', 'Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (type: 'success' | 'error', message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayInputChange = (index: number, value: string, field: 'responsibilities' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'responsibilities' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (index: number, field: 'responsibilities' | 'requirements') => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      category: 'Design',
      description: '',
      fullDescription: '',
      responsibilities: [''],
      requirements: [''],
      type: 'Full-Time',
      salary: '',
      isActive: true,
      isFeatured: false,
      logoColor: 'bg-gray-700'
    });
    setEditingJob(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const jobData = {
        ...formData,
        responsibilities: formData.responsibilities.filter(r => r.trim() !== ''),
        requirements: formData.requirements.filter(r => r.trim() !== ''),
        postedDate: editingJob?.postedDate || new Date().toISOString().split('T')[0]
      };

      if (editingJob) {
        const response = await fetch(`${API_URL}/jobs/${editingJob._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobData)
        });

        if (!response.ok) throw new Error('Failed to update job');
        
        showAlert('success', 'Job updated successfully');
      } else {
        const response = await fetch(`${API_URL}/jobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobData)
        });

        if (!response.ok) throw new Error('Failed to create job');
        
        showAlert('success', 'Job created successfully');
      }

      resetForm();
      fetchJobs();
    } catch (error) {
      console.error('Error saving job:', error);
      showAlert('error', `Failed to ${editingJob ? 'update' : 'create'} job`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      category: job.category,
      description: job.description,
      fullDescription: job.fullDescription || '',
      responsibilities: job.responsibilities && job.responsibilities.length > 0 ? job.responsibilities : [''],
      requirements: job.requirements && job.requirements.length > 0 ? job.requirements : [''],
      type: job.type || 'Full-Time',
      salary: job.salary || '',
      isActive: job.isActive,
      isFeatured: job.isFeatured || false,
      logoColor: job.logoColor || 'bg-gray-700'
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/jobs/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete job');
      
      showAlert('success', 'Job deleted successfully');
      fetchJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      showAlert('error', 'Failed to delete job');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: jobs.length,
    active: jobs.filter(j => j.isActive).length,
    featured: jobs.filter(j => j.isFeatured).length,
    inactive: jobs.filter(j => !j.isActive).length
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button onClick={handleLogout} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            Logout
          </button>
        </div>
        {alert && (
          <div className={`mb-6 p-4 rounded-lg ${alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {alert.message}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Total Jobs</h3>
            <p className="text-3xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Active Jobs</h3>
            <p className="text-3xl font-bold text-green-600">{stats.active}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Featured Jobs</h3>
            <p className="text-3xl font-bold text-blue-600">{stats.featured}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium mb-2">Inactive Jobs</h3>
            <p className="text-3xl font-bold text-gray-600">{stats.inactive}</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button onClick={() => { resetForm(); setShowAddForm(true); }} className="ml-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            + Add New Job
          </button>
        </div>
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingJob ? 'Edit Job' : 'Add New Job'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label><input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Company *</label><input type="text" name="company" value={formData.company} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Location *</label><input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Category *</label><select name="category" value={formData.category} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"><option value="Design">Design</option><option value="Marketing">Marketing</option><option value="Engineering">Engineering</option><option value="Technology">Technology</option><option value="Business">Business</option><option value="Sales">Sales</option><option value="Human Resource">Human Resource</option><option value="Finance">Finance</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Job Type *</label><select name="type" value={formData.type} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"><option value="Full-Time">Full-Time</option><option value="Part-Time">Part-Time</option><option value="Contract">Contract</option><option value="Internship">Internship</option></select></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Salary</label><input type="text" name="salary" value={formData.salary} onChange={handleInputChange} placeholder="$50,000 - $70,000" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-2">Logo Color</label><select name="logoColor" value={formData.logoColor} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"><option value="bg-gray-700">Gray</option><option value="bg-blue-500">Blue</option><option value="bg-green-500">Green</option><option value="bg-red-500">Red</option><option value="bg-purple-500">Purple</option><option value="bg-yellow-500">Yellow</option><option value="bg-cyan-400">Cyan</option><option value="bg-black">Black</option></select></div>
                <div className="flex items-center gap-6"><label className="flex items-center gap-2"><input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleInputChange} className="w-4 h-4" /><span className="text-sm font-medium text-gray-700">Active</span></label><label className="flex items-center gap-2"><input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleInputChange} className="w-4 h-4" /><span className="text-sm font-medium text-gray-700">Featured</span></label></div>
              </div>
              <div className="mt-6"><label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label><textarea name="description" value={formData.description} onChange={handleInputChange} required rows={2} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
              <div className="mt-6"><label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label><textarea name="fullDescription" value={formData.fullDescription} onChange={handleInputChange} rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" /></div>
              <div className="mt-6"><label className="block text-sm font-medium text-gray-700 mb-2">Responsibilities</label>{formData.responsibilities.map((resp, index) => (<div key={index} className="flex gap-2 mb-2"><input type="text" value={resp} onChange={(e) => handleArrayInputChange(index, e.target.value, 'responsibilities')} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter responsibility" />{formData.responsibilities.length > 1 && (<button type="button" onClick={() => removeArrayItem(index, 'responsibilities')} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>)}</div>))}<button type="button" onClick={() => addArrayItem('responsibilities')} className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">+ Add Responsibility</button></div>
              <div className="mt-6"><label className="block text-sm font-medium text-gray-700 mb-2">Requirements</label>{formData.requirements.map((req, index) => (<div key={index} className="flex gap-2 mb-2"><input type="text" value={req} onChange={(e) => handleArrayInputChange(index, e.target.value, 'requirements')} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Enter requirement" />{formData.requirements.length > 1 && (<button type="button" onClick={() => removeArrayItem(index, 'requirements')} className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>)}</div>))}<button type="button" onClick={() => addArrayItem('requirements')} className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">+ Add Requirement</button></div>
              <div className="flex gap-4 mt-8"><button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400">{loading ? 'Saving...' : editingJob ? 'Update Job' : 'Create Job'}</button><button type="button" onClick={resetForm} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors">Cancel</button></div>
            </form>
          </div>
        )}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (<tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">Loading...</td></tr>) : filteredJobs.length === 0 ? (<tr><td colSpan={6} className="px-6 py-4 text-center text-gray-500">No jobs found</td></tr>) : (filteredJobs.map((job) => (<tr key={job._id} className="hover:bg-gray-50"><td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{job.title}</div></td><td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{job.company}</div></td><td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{job.category}</div></td><td className="px-6 py-4 whitespace-nowrap"><div className="text-sm text-gray-900">{job.type}</div></td><td className="px-6 py-4 whitespace-nowrap"><div className="flex gap-2">{job.isActive && (<span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>)}{!job.isActive && (<span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Inactive</span>)}{job.isFeatured && (<span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Featured</span>)}</div></td><td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><button onClick={() => handleEdit(job)} className="text-blue-600 hover:text-blue-900 mr-4">Edit</button><button onClick={() => handleDelete(job._id)} className="text-red-600 hover:text-red-900">Delete</button></td></tr>)))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
