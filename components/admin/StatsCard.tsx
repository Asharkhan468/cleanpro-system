// components/admin/StatsCard.tsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface StatsCardProps {
  title: string;
  value: any;
  icon: IconDefinition;
  color: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

const colorVariants = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    iconBg: 'bg-gradient-to-br from-blue-500 to-blue-600',
    iconColor: 'text-white',
    border: 'border-blue-100',
    shadow: 'shadow-blue-500/20'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    iconBg: 'bg-gradient-to-br from-green-500 to-green-600',
    iconColor: 'text-white',
    border: 'border-green-100',
    shadow: 'shadow-green-500/20'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    iconBg: 'bg-gradient-to-br from-purple-500 to-purple-600',
    iconColor: 'text-white',
    border: 'border-purple-100',
    shadow: 'shadow-purple-500/20'
  },
  yellow: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    iconBg: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    iconColor: 'text-white',
    border: 'border-yellow-100',
    shadow: 'shadow-yellow-500/20'
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    iconBg: 'bg-gradient-to-br from-red-500 to-red-600',
    iconColor: 'text-white',
    border: 'border-red-100',
    shadow: 'shadow-red-500/20'
  }
};

const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  const colors = colorVariants[color];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 ${colors.iconBg} rounded-xl flex items-center justify-center shadow-lg ${colors.shadow}`}>
          <FontAwesomeIcon icon={icon} className={`w-6 h-6 ${colors.iconColor}`} />
        </div>
       
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-500">{title}</p>
      
      {/* Mini Sparkline (optional decorative element) */}
      <div className="mt-4 flex items-center space-x-1">
        {[40, 25, 35, 45, 30, 50, 65].map((height, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full ${colors.bg}`}
            style={{ height: `${height}%`, maxHeight: '40px' }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;