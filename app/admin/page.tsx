"use client"
import { useState } from 'react';
import StatsCard from '@/components/admin/StatsCard';
import RecentBookingsTable from '@/components/admin/RecentBooking';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarCheck,
  faDollarSign,
  faUsers,
  faStar,
  faArrowUp,
  faArrowDown,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
} from 'chart.js';
import { Line, Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement
);

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('year');

  // Sample data for charts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue 2024',
        data: [6500, 7200, 8100, 7800, 9500, 10200, 11500, 12100, 11800, 13500, 14200, 15800],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const serviceDistributionData = {
    labels: ['Deep Cleaning', 'Office Cleaning', 'Carpet Cleaning', 'AC Servicing', 'Car Wash'],
    datasets: [
      {
        data: [35, 25, 20, 12, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 1,
        hoverOffset: 4
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'white',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        padding: 12,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          callback: function(value: any) {
            return '$' + value;
          }
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: 'white',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        padding: 12,
        callbacks: {
          label: function(context: any) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    },
    cutout: '70%',
    radius: '90%'
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
            <option value="year">This year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bookings"
          value="1,250"
          change="+12.5%"
          icon={faCalendarCheck}
          color="blue"
        />
        <StatsCard
          title="Revenue"
          value="$45,890"
          change="+23.1%"
          icon={faDollarSign}
          color="green"
        />
        <StatsCard
          title="Total Customers"
          value="890"
          change="+8.2%"
          icon={faUsers}
          color="purple"
        />
        <StatsCard
          title="Satisfaction"
          value="98%"
          change="+5.4%"
          icon={faStar}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <p className="text-sm text-gray-500">Monthly revenue performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  <FontAwesomeIcon icon={faArrowUp} className="w-3 h-3 mr-1" />
                  +23.1%
                </span>
                <span className="text-sm text-gray-500">vs last month</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <Line data={revenueData} options={lineChartOptions} />
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Service Distribution</h3>
            <p className="text-sm text-gray-500">Popularity by service type</p>
          </div>
          <div className="h-64 relative">
            <Doughnut data={serviceDistributionData} options={doughnutOptions} />
          </div>
          <div className="mt-6 space-y-3">
            {serviceDistributionData.labels.map((label, index) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: serviceDistributionData.datasets[0].backgroundColor[index] }}
                  ></span>
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">{serviceDistributionData.datasets[0].data[index]}%</span>
                  <span className="text-xs text-gray-400">({serviceDistributionData.datasets[0].data[index] * 8} bookings)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Table - Takes 2/3 of the space */}
        <div className="lg:col-span-2">
          <RecentBookingsTable />
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          {/* Today's Schedule */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Schedule</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-blue-600">10:{i}0</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Deep Cleaning</p>
                    <p className="text-xs text-gray-500">John Doe • 123 Main St</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    Confirmed
                  </span>
                </div>
              ))}
              <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                View Full Schedule
              </button>
            </div>
          </div>

          {/* Top Performing Services */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Services</h3>
            <div className="space-y-4">
              {['Deep Cleaning', 'Office Cleaning', 'Carpet Cleaning'].map((service, index) => (
                <div key={service} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900 mr-2">{index + 1}.</span>
                    <span className="text-sm text-gray-600">{service}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{95 - index * 10} bookings</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}