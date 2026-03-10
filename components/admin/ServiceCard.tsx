// components/admin/ServiceCard.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faEye,
  faStar,
  faClock,
  faDollarSign,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: string;
    icon: IconDefinition;
    category: string;
    popularity: number;
    bookings: number;
    revenue: string;
    status: 'active' | 'inactive';
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      {/* Header with gradient */}
      <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
      
      <div className="p-6">
        {/* Icon and Status */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <FontAwesomeIcon icon={service.icon} className="w-7 h-7" />
          </div>
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
            service.status === 'active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
          </span>
        </div>

        {/* Service Info */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{service.description}</p>

        {/* Category Tag */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">
            {service.category}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FontAwesomeIcon icon={faDollarSign} className="w-3 h-3 mr-1 text-blue-600" />
              Price
            </div>
            <p className="text-lg font-bold text-gray-900">{service.price}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <div className="flex items-center text-sm text-gray-600 mb-1">
              <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-1 text-blue-600" />
              Duration
            </div>
            <p className="text-lg font-bold text-gray-900">{service.duration}</p>
          </div>
        </div>

        {/* Performance Metrics */}
        {/* <div className="space-y-3 mb-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Popularity</span>
              <span className="font-medium text-gray-900">{service.popularity}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                style={{ width: `${service.popularity}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">
              <FontAwesomeIcon icon={faUsers} className="w-3 h-3 mr-1" />
              Bookings
            </span>
            <span className="font-medium text-gray-900">{service.bookings}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Revenue</span>
            <span className="font-medium text-gray-900">{service.revenue}</span>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Details">
            <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
            <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
            <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;