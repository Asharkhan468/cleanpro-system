// "use client";
// import { useEffect, useState } from "react";
// import StatsCard from "@/components/admin/StatsCard";
// import RecentBookingsTable from "@/components/admin/RecentBooking";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCalendarCheck,
//   faDollarSign,
//   faUsers,
//   faStar,
//   faArrowUp,
// } from "@fortawesome/free-solid-svg-icons";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//   ArcElement,
// } from "chart.js";
// import { Line, Doughnut } from "react-chartjs-2";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
//   ArcElement,
// );

// export default function AdminDashboard() {
//   const [timeRange, setTimeRange] = useState("year");
//   const [totalUsers, setTotalUsers] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [services, setServices] = useState([]);
//   const [stats, setStats] = useState<any>({});
//   const [percentageChange, setPercentageChange] = useState<string>("0%");

//   const [revenueData, setRevenueData] = useState<any>({
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Revenue",
//         data: Array(12).fill(0),
//         borderColor: "rgb(59, 130, 246)",
//         backgroundColor: "rgba(59, 130, 246, 0.1)",
//         fill: true,
//         tension: 0.4,
//         pointBackgroundColor: "rgb(59, 130, 246)",
//         pointBorderColor: "white",
//         pointBorderWidth: 2,
//         pointRadius: 4,
//         pointHoverRadius: 6,
//       },
//     ],
//   });
//   const fetchTotalUsers = async () => {
//     try {
//       const res = await fetch("/api/totalUsers");
//       const data = await res.json();
//       setTotalUsers(data.totalUsers);
//     } catch (err) {
//       console.error("Error fetching total users:", err);
//       setTotalUsers(0);
//     } finally {
//       setLoading(false);
//     }
//   };

//   //service

//   const getServices = async () => {
//     try {
//       const res = await fetch("/api/service");

//       const data = await res.json();

//       setServices(data.data);
//       if (!res.ok) {
//         throw new Error(data.message || "Failed to fetch services");
//       }

//       return data.data;
//     } catch (error) {
//       console.error("Get Services Error:", (error as any).message);
//       return [];
//     }
//   };

//   //stats

//   const getStats = async () => {
//     const res = await fetch("/api/stats");
//     const data = await res.json();
//     setStats(data.data);
//   };

//   const fetchRevenue = async () => {
//     try {
//       const res = await fetch("/api/revenueData");
//       const result = await res.json();

//       if (result.success) {
//         console.log(result.data);
//         setRevenueData(result.data);
//       } else {
//         console.error(result.message);
//       }
//     } catch (err) {
//       console.error("Frontend error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchTotalUsers();
//     getServices();
//     getStats();
//     fetchRevenue();
//   }, []);

//   const serviceDistributionData = {
//     labels: services.map((service: any) => service.name), // service names from API
//     datasets: [
//       {
//         data: services.map((service: any) => Number(service.price)), // or any metric, e.g., number of bookings
//         backgroundColor: [
//           "rgba(59, 130, 246, 0.8)",
//           "rgba(16, 185, 129, 0.8)",
//           "rgba(245, 158, 11, 0.8)",
//           "rgba(139, 92, 246, 0.8)",
//           "rgba(236, 72, 153, 0.8)",
//           "rgba(249, 115, 22, 0.8)",
//           "rgba(34, 197, 94, 0.8)",
//           "rgba(236, 72, 153, 0.8)",
//         ].slice(0, services.length), // pick only as many colors as services
//         borderColor: [
//           "rgba(59, 130, 246, 1)",
//           "rgba(16, 185, 129, 1)",
//           "rgba(245, 158, 11, 1)",
//           "rgba(139, 92, 246, 1)",
//           "rgba(236, 72, 153, 1)",
//           "rgba(249, 115, 22, 1)",
//           "rgba(34, 197, 94, 1)",
//           "rgba(236, 72, 153, 1)",
//         ].slice(0, services.length),
//         borderWidth: 1,
//         hoverOffset: 4,
//       },
//     ],
//   };
//   const lineChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         backgroundColor: "rgba(17, 24, 39, 0.9)",
//         titleColor: "white",
//         bodyColor: "rgba(255, 255, 255, 0.8)",
//         padding: 12,
//         borderColor: "rgba(255, 255, 255, 0.1)",
//         borderWidth: 1,
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         grid: {
//           color: "rgba(0, 0, 0, 0.05)",
//           drawBorder: false,
//         },
//         ticks: {
//           callback: function (value: any) {
//             return "$" + value;
//           },
//         },
//       },
//       x: {
//         grid: {
//           display: false,
//         },
//       },
//     },
//   };

//   const doughnutOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: false,
//       },
//       tooltip: {
//         backgroundColor: "rgba(17, 24, 39, 0.9)",
//         titleColor: "white",
//         bodyColor: "rgba(255, 255, 255, 0.8)",
//         padding: 12,
//         callbacks: {
//           label: function (context: any) {
//             return `${context.label}: ${context.raw}%`;
//           },
//         },
//       },
//     },
//     cutout: "70%",
//     radius: "90%",
//   };

//   const totalData = serviceDistributionData.datasets[0].data.reduce(
//     (acc, value) => acc + value,
//     0,
//   );

//   useEffect(() => {
//     if (!revenueData?.datasets?.[0]?.data) return;

//     const data = revenueData.datasets[0].data;
//     const currentMonthIndex = new Date().getMonth(); // current month
//     const lastMonthIndex = currentMonthIndex - 1;

//     const currentMonth = data[currentMonthIndex] || 0;
//     const lastMonth = data[lastMonthIndex] || 0;

//     let change = "0%";

//     if (lastMonth === 0 && currentMonth > 0) {
//       change = "+100%";
//     } else if (lastMonth === 0 && currentMonth === 0) {
//       change = "0%";
//     } else {
//       change = `${(((currentMonth - lastMonth) / lastMonth) * 100).toFixed(1)}%`;
//     }

//     setPercentageChange(change);
//   }, [revenueData]);

//   return (
//     <div className="space-y-6">
//       {/* Page Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//           <p className="text-gray-600 mt-1">
//             Welcome back! Here's what's happening with your business.
//           </p>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatsCard
//           title="Total Bookings"
//           value={stats?.totalBookings || 0}
//           icon={faCalendarCheck}
//           color="blue"
//         />
//         <StatsCard
//           title="Revenue"
//           value={`$ ${stats?.totalRevenue || 0}`}
//           icon={faDollarSign}
//           color="green"
//         />
//         <StatsCard
//           title="Total Customers"
//           value={totalUsers || 0}
//           icon={faUsers}
//           color="purple"
//         />
//         <StatsCard
//           title="Total Services"
//           value={services.length || 0}
//           icon={faStar}
//           color="yellow"
//         />
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Revenue Chart */}
//         <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h3 className="text-lg font-semibold text-gray-900">
//                 Revenue Overview
//               </h3>
//               <p className="text-sm text-gray-500">
//                 Monthly revenue performance
//               </p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2">
//                 <span className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
//                   <FontAwesomeIcon icon={faArrowUp} className="w-3 h-3 mr-1" />
//                   {percentageChange}
//                 </span>
//                 <span className="text-sm text-gray-500">vs last month</span>
//               </div>
//             </div>
//           </div>
//           <div className="h-80 w-full">
//             <Line data={revenueData} options={lineChartOptions} />
//           </div>
//         </div>

//         {/* Service Distribution */}
//         <div className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow">
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold text-gray-900">
//               Service Distribution
//             </h3>
//             <p className="text-sm text-gray-500">Popularity by service type</p>
//           </div>
//           <div className="h-64 relative">
//             <Doughnut
//               data={serviceDistributionData}
//               options={doughnutOptions}
//             />
//           </div>
//           <div className="mt-6 space-y-3">
//             {serviceDistributionData.labels.map((label, index) => (
//               <div key={label} className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <span
//                     className="w-3 h-3 rounded-full mr-2"
//                     style={{
//                       backgroundColor:
//                         serviceDistributionData.datasets[0].backgroundColor[
//                           index
//                         ],
//                     }}
//                   ></span>
//                   <span className="text-sm text-gray-600">{label}</span>
//                 </div>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-sm font-medium text-gray-900">
//                     {totalData
//                       ? (
//                           (serviceDistributionData.datasets[0].data[index] /
//                             totalData) *
//                           100
//                         ).toFixed(1)
//                       : 0}
//                     %
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import StatsCard from "@/components/admin/StatsCard";
import RecentBookingsTable from "@/components/admin/RecentBooking";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faDollarSign,
  faUsers,
  faStar,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
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
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

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
  ArcElement,
);

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("year");
  const [totalUsers, setTotalUsers] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState<any>({});
  const [percentageChange, setPercentageChange] = useState<string>("0%");

  const [revenueData, setRevenueData] = useState<any>({
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Revenue",
        data: Array(12).fill(0),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });
  
  const fetchTotalUsers = async () => {
    try {
      const res = await fetch("/api/totalUsers");
      const data = await res.json();
      setTotalUsers(data.totalUsers);
    } catch (err) {
      console.error("Error fetching total users:", err);
      setTotalUsers(0);
    } finally {
      setLoading(false);
    }
  };

  //service
  const getServices = async () => {
    try {
      const res = await fetch("/api/service");
      const data = await res.json();
      setServices(data.data);
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch services");
      }
      return data.data;
    } catch (error) {
      console.error("Get Services Error:", (error as any).message);
      return [];
    }
  };

  //stats
  const getStats = async () => {
    const res = await fetch("/api/stats");
    const data = await res.json();
    setStats(data.data);
  };

  const fetchRevenue = async () => {
    try {
      const res = await fetch("/api/revenueData");
      const result = await res.json();
      if (result.success) {
        console.log(result.data);
        setRevenueData(result.data);
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error("Frontend error:", err);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    getServices();
    getStats();
    fetchRevenue();
  }, []);

  const serviceDistributionData = {
    labels: services.map((service: any) => service.name),
    datasets: [
      {
        data: services.map((service: any) => Number(service.price)),
        backgroundColor: [
          "rgba(59, 130, 246, 0.8)",
          "rgba(16, 185, 129, 0.8)",
          "rgba(245, 158, 11, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(236, 72, 153, 0.8)",
        ].slice(0, services.length),
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(16, 185, 129, 1)",
          "rgba(245, 158, 11, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(236, 72, 153, 1)",
        ].slice(0, services.length),
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };
  
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "white",
        bodyColor: "rgba(255, 255, 255, 0.8)",
        padding: 12,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          callback: function (value: any) {
            return "$" + value;
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: true,
          maxTicksLimit: 6,
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(17, 24, 39, 0.9)",
        titleColor: "white",
        bodyColor: "rgba(255, 255, 255, 0.8)",
        padding: 12,
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw}%`;
          },
        },
      },
    },
    cutout: "70%",
    radius: "90%",
  };

  const totalData = serviceDistributionData.datasets[0].data.reduce(
    (acc, value) => acc + value,
    0,
  );

  useEffect(() => {
    if (!revenueData?.datasets?.[0]?.data) return;

    const data = revenueData.datasets[0].data;
    const currentMonthIndex = new Date().getMonth();
    const lastMonthIndex = currentMonthIndex - 1;

    const currentMonth = data[currentMonthIndex] || 0;
    const lastMonth = data[lastMonthIndex] || 0;

    let change = "0%";

    if (lastMonth === 0 && currentMonth > 0) {
      change = "+100%";
    } else if (lastMonth === 0 && currentMonth === 0) {
      change = "0%";
    } else {
      change = `${(((currentMonth - lastMonth) / lastMonth) * 100).toFixed(1)}%`;
    }

    setPercentageChange(change);
  }, [revenueData]);

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatsCard
          title="Total Bookings"
          value={stats?.totalBookings || 0}
          icon={faCalendarCheck}
          color="blue"
        />
        <StatsCard
          title="Revenue"
          value={`$ ${stats?.totalRevenue || 0}`}
          icon={faDollarSign}
          color="green"
        />
        <StatsCard
          title="Total Customers"
          value={totalUsers || 0}
          icon={faUsers}
          color="purple"
        />
        <StatsCard
          title="Total Services"
          value={services.length || 0}
          icon={faStar}
          color="yellow"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                Revenue Overview
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">
                Monthly revenue performance
              </p>
            </div>
            <div className="flex items-center justify-between sm:justify-end space-x-4">
              <div className="flex items-center space-x-2">
                <span className="flex items-center text-xs sm:text-sm text-green-600 bg-green-50 px-2 sm:px-3 py-1 rounded-full">
                  <FontAwesomeIcon icon={faArrowUp} className="w-3 h-3 mr-1" />
                  {percentageChange}
                </span>
                <span className="text-xs sm:text-sm text-gray-500">
                  vs last month
                </span>
              </div>
            </div>
          </div>
          <div className="h-64 sm:h-80 w-full">
            <Line data={revenueData} options={lineChartOptions} />
          </div>
        </div>

        {/* Service Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow">
          <div className="mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
              Service Distribution
            </h3>
            <p className="text-xs sm:text-sm text-gray-500">
              Popularity by service type
            </p>
          </div>
          <div className="h-48 sm:h-64 relative">
            <Doughnut
              data={serviceDistributionData}
              options={doughnutOptions}
            />
          </div>
          <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
            {serviceDistributionData.labels.map((label, index) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center min-w-0 flex-1">
                  <span
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full mr-2 flex-shrink-0"
                    style={{
                      backgroundColor:
                        serviceDistributionData.datasets[0].backgroundColor[
                          index
                        ],
                    }}
                  ></span>
                  <span className="text-xs sm:text-sm text-gray-600 truncate">
                    {label}
                  </span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3 ml-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-900">
                    {totalData
                      ? (
                          (serviceDistributionData.datasets[0].data[index] /
                            totalData) *
                          100
                        ).toFixed(1)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

     
    </div>
  );
}