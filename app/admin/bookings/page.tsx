// app/admin/bookings/page.tsx
"use client"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faFilter,
  faDownload,
  faPlus,
  faCalendarAlt,
  faUser,
  faPhone,
  faEnvelope,
  faMapMarker,
  faClock,
  faDollarSign,
  faEye,
  faEdit,
  faTrash,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import BookingModal from '@/components/admin/BookingModal';

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample bookings data
  const bookings = [
    {
      id: 'BK001',
      customer: 'John Doe',
      email: 'john@email.com',
      phone: '(555) 123-4567',
      service: 'Deep Cleaning',
      date: '2024-01-15',
      time: '10:00 AM',
      address: '123 Main St, Apt 4B, Los Angeles, CA 90210',
      status: 'confirmed',
      amount: '$199',
      paymentMethod: 'cash'
    },
    {
      id: 'BK002',
      customer: 'Jane Smith',
      email: 'jane@email.com',
      phone: '(555) 234-5678',
      service: 'Office Cleaning',
      date: '2024-01-16',
      time: '2:00 PM',
      address: '456 Business Ave, Suite 200, Los Angeles, CA 90211',
      status: 'pending',
      amount: '$299',
      paymentMethod: 'cash'
    },
    {
      id: 'BK003',
      customer: 'Mike Johnson',
      email: 'mike@email.com',
      phone: '(555) 345-6789',
      service: 'Carpet Cleaning',
      date: '2024-01-14',
      time: '11:00 AM',
      address: '789 Oak Rd, Los Angeles, CA 90212',
      status: 'completed',
      amount: '$149',
      paymentMethod: 'cash'
    },
    {
      id: 'BK004',
      customer: 'Sarah Williams',
      email: 'sarah@email.com',
      phone: '(555) 456-7890',
      service: 'AC Servicing',
      date: '2024-01-17',
      time: '9:00 AM',
      address: '321 Pine St, Los Angeles, CA 90213',
      status: 'cancelled',
      amount: '$89',
      paymentMethod: 'cash'
    },
    {
      id: 'BK005',
      customer: 'Robert Brown',
      email: 'robert@email.com',
      phone: '(555) 567-8901',
      service: 'Car Wash',
      date: '2024-01-15',
      time: '3:00 PM',
      address: '654 Maple Ave, Los Angeles, CA 90214',
      status: 'confirmed',
      amount: '$79',
      paymentMethod: 'cash'
    },
    {
      id: 'BK006',
      customer: 'Emily Davis',
      email: 'emily@email.com',
      phone: '(555) 678-9012',
      service: 'Deep Cleaning',
      date: '2024-01-18',
      time: '1:00 PM',
      address: '987 Cedar Ln, Los Angeles, CA 90215',
      status: 'pending',
      amount: '$199',
      paymentMethod: 'cash'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  // Filter bookings based on status and search
  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesSearch = 
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600 mt-1">Manage and track all customer bookings</p>
        </div>
       
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900">{totalBookings}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-gray-900">{pendingBookings}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
          <p className="text-sm text-gray-600">Confirmed</p>
          <p className="text-2xl font-bold text-gray-900">{confirmedBookings}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-gray-900">{completedBookings}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by ID, customer, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FontAwesomeIcon icon={faDownload} className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {booking.customer.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{booking.customer}</p>
                        <p className="text-xs text-gray-500">{booking.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{booking.date}</div>
                    <div className="text-xs text-gray-500">{booking.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <p className="text-sm text-gray-600">Showing 1 to {filteredBookings.length} of {bookings.length} entries</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-600" />
            </button>
            <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">3</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}