// components/admin/BookingModal.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faUser,
  faCalendar,
  faClock,
  faMapMarker,
  faPhone,
  faEnvelope,
  faDollarSign,
  faTag
} from '@fortawesome/free-solid-svg-icons';

interface BookingModalProps {
  booking: {
    id: string;
    customer: string;
    service: string;
    date: string;
    time: string;
    status: string;
    amount: string;
  };
  onClose: () => void;
}

const BookingModal = ({ booking, onClose }: BookingModalProps) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Booking Details</h3>
              <p className="text-sm text-gray-600 mt-1">ID: {booking.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4 mr-2 text-blue-600" />
                  Customer Information
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <p className="text-sm">
                    <span className="text-gray-600">Name:</span>{' '}
                    <span className="font-medium text-gray-900">{booking.customer}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Email:</span>{' '}
                    <span className="font-medium text-gray-900">john.doe@email.com</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Phone:</span>{' '}
                    <span className="font-medium text-gray-900">(555) 123-4567</span>
                  </p>
                </div>
              </div>

              {/* Service Info */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <FontAwesomeIcon icon={faTag} className="w-4 h-4 mr-2 text-blue-600" />
                  Service Information
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <p className="text-sm">
                    <span className="text-gray-600">Service:</span>{' '}
                    <span className="font-medium text-gray-900">{booking.service}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Amount:</span>{' '}
                    <span className="font-medium text-gray-900">{booking.amount}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Status:</span>{' '}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 mr-2 text-blue-600" />
                  Schedule
                </h4>
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <p className="text-sm">
                    <span className="text-gray-600">Date:</span>{' '}
                    <span className="font-medium text-gray-900">{booking.date}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Time:</span>{' '}
                    <span className="font-medium text-gray-900">{booking.time}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-600">Duration:</span>{' '}
                    <span className="font-medium text-gray-900">2-3 hours</span>
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <FontAwesomeIcon icon={faMapMarker} className="w-4 h-4 mr-2 text-blue-600" />
                  Service Address
                </h4>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-900">
                    123 Main Street<br />
                    Apt 4B<br />
                    Los Angeles, CA 90210
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Additional Notes</h4>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-sm text-gray-600">
                  Customer has two dogs. Please bring pet-safe cleaning products. Gate code: 1234.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;