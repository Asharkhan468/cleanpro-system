// app/admin/services/page.tsx
"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBuilding,
  faCar,
  faWind,
  faSnowflake,
  faShield,
  faEdit,
  faTrash,
  faPlus,
  faSearch,
  faFilter,
  faStar,
  faUsers,
  faCalendarCheck,
  faDollarSign,
  faEye
} from '@fortawesome/free-solid-svg-icons';
import ServiceCard from '@/components/admin/ServiceCard';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: any;
  category: string;
  popularity: number;
  bookings: number;
  revenue: string;
  status: 'active' | 'inactive';
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Sample services data
  const services: Service[] = [
    {
      id: '1',
      name: 'Deep Cleaning Service',
      description: 'Complete home deep cleaning including all rooms, kitchen, and bathrooms',
      price: '$199',
      duration: '3-4 hours',
      icon: faHome,
      category: 'residential',
      popularity: 95,
      bookings: 450,
      revenue: '$89,550',
      status: 'active'
    },
    {
      id: '2',
      name: 'Office Cleaning',
      description: 'Professional office space cleaning for workspaces and common areas',
      price: '$299',
      duration: '4-5 hours',
      icon: faBuilding,
      category: 'commercial',
      popularity: 88,
      bookings: 320,
      revenue: '$95,680',
      status: 'active'
    },
    {
      id: '3',
      name: 'Car Wash & Detailing',
      description: 'Complete car cleaning, waxing, and interior detailing',
      price: '$79',
      duration: '1-2 hours',
      icon: faCar,
      category: 'automotive',
      popularity: 92,
      bookings: 580,
      revenue: '$45,820',
      status: 'active'
    },
    {
      id: '4',
      name: 'Carpet Cleaning',
      description: 'Deep carpet steam cleaning and stain removal',
      price: '$149',
      duration: '2-3 hours',
      icon: faWind,
      category: 'residential',
      popularity: 85,
      bookings: 280,
      revenue: '$41,720',
      status: 'active'
    },
    {
      id: '5',
      name: 'AC Servicing',
      description: 'AC maintenance, filter cleaning, and performance check',
      price: '$89',
      duration: '1-2 hours',
      icon: faSnowflake,
      category: 'maintenance',
      popularity: 78,
      bookings: 190,
      revenue: '$16,910',
      status: 'inactive'
    },
    {
      id: '6',
      name: 'Security System Setup',
      description: 'Complete security installation with cameras and sensors',
      price: '$399',
      duration: '3-4 hours',
      icon: faShield,
      category: 'security',
      popularity: 72,
      bookings: 120,
      revenue: '$47,880',
      status: 'active'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'security', label: 'Security' }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const totalServices = services.length;
  const activeServices = services.filter(s => s.status === 'active').length;
  const totalBookings = services.reduce((acc, s) => acc + s.bookings, 0);
  const totalRevenue = services.reduce((acc, s) => acc + parseInt(s.revenue.replace(/[^0-9]/g, '')), 0);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600 mt-1">Manage your service offerings and pricing</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
          Add New Service
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{totalServices}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faHome} className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-gray-900">{activeServices}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faCalendarCheck} className="w-5 h-5 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon icon={faDollarSign} className="w-5 h-5 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4 text-gray-600" />
            </button>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-50'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bookings</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white mr-3">
                          <FontAwesomeIcon icon={service.icon} className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{service.name}</p>
                          <p className="text-xs text-gray-500">{service.description.substring(0, 50)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 capitalize">{service.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{service.bookings}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{service.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                        service.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                          <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                          <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}