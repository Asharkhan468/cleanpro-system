// components/admin/RecentBookingsTable.tsx
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEdit,
  faTrash,
  faFilter,
  faDownload,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
import BookingModal from './BookingModal';

interface Booking {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: string;
}

const RecentBookingsTable = () => {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data
  const bookings: Booking[] = [
    {
      id: 'BK001',
      customer: 'John Doe',
      service: 'Deep Cleaning',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      amount: '$199'
    },
    {
      id: 'BK002',
      customer: 'Jane Smith',
      service: 'Office Cleaning',
      date: '2024-01-16',
      time: '2:00 PM',
      status: 'pending',
      amount: '$299'
    },
    {
      id: 'BK003',
      customer: 'Mike Johnson',
      service: 'Carpet Cleaning',
      date: '2024-01-14',
      time: '11:00 AM',
      status: 'completed',
      amount: '$149'
    },
    {
      id: 'BK004',
      customer: 'Sarah Williams',
      service: 'AC Servicing',
      date: '2024-01-17',
      time: '9:00 AM',
      status: 'cancelled',
      amount: '$89'
    },
    {
      id: 'BK005',
      customer: 'Robert Brown',
      service: 'Car Wash',
      date: '2024-01-15',
      time: '3:00 PM',
      status: 'confirmed',
      amount: '$79'
    }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            <p className="text-sm text-gray-600 mt-1">You have {bookings.length} bookings this month</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4 mr-2 text-gray-500" />
              Filter
            </button>
            <button className="flex items-center px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <FontAwesomeIcon icon={faDownload} className="w-4 h-4 mr-2 text-gray-500" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.service}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {booking.date} at {booking.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleViewBooking(booking)}
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                      title="View"
                    >
                      <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                    </button>
                    <button
                      className="text-green-600 hover:text-green-700 transition-colors"
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-700 transition-colors"
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
        <p className="text-sm text-gray-600">Showing 1 to 5 of 25 entries</p>
        <div className="flex items-center space-x-2">
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4 text-gray-600" />
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm">1</button>
          <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">2</button>
          <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">3</button>
          <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">4</button>
          <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-gray-600" />
          </button>
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
};

export default RecentBookingsTable;