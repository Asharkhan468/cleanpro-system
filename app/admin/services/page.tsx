"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faEdit,
  faTrash,
  faPlus,
  faSearch,
  faFilter,
  faStar,
  faUsers,
  faCalendarCheck,  faDollarSign,
  faBuilding,
  faCar,
  faTools,
  faShieldAlt,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import ServiceCard from "@/components/admin/ServiceCard";
import AddServiceModal from "@/components/admin/AddService";
import { toast } from "react-toastify";

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
  status: "active" | "inactive";
}

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showModal, setShowModal] = useState(false);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState<any>({});
  const [editData, setEditData] = useState<any | null>(null);

  const categoryIcons: any = {
    residential: faHome,
    commercial: faBuilding,
    automotive: faCar,
    maintenance: faTools,
    security: faShieldAlt,
  };

  const openEditModal = (service: any) => {
    setEditData(service);
    setShowModal(true);
    console.log(service);
  };

  const getStats = async () => {
    const res = await fetch("/api/stats");
    const data = await res.json();
    setStats(data.data);
  };

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "automotive", label: "Automotive" },
    { value: "maintenance", label: "Maintenance" },
    { value: "security", label: "Security" },
  ];

  const getServices = async () => {
    try {
      const res = await fetch("/api/service");

      const data = await res.json();
      console.log(data.data);
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

  useEffect(() => {
    getServices();
    getStats();
  }, []);

  const filteredServices = services.filter((service: any) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Stats
  const totalServices = services?.length;
  const activeServices = services?.filter(
    (s: any) => s.status === "active",
  ).length;
  const totalBookings = stats?.totalBookings;
  const totalRevenue = stats?.totalRevenue?.toLocaleString();

  //Add Service

  const handleAddService = async (service: any) => {
    try {
      const res = await fetch("/api/service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Service added successfully!");
        getServices();
      } else {
        toast.info(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };
  //Edit service
  const handleEditService = async (service: any) => {
    try {
      const res = await fetch("/api/service", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });

      const data = await res.json();

      if (data.success) {
        getServices();
        toast.success("Service updated successfully!");
      } else {
        toast.info(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  //delete Service

  const handleDeleteService = async (id: string) => {
    console.log(id);
    try {
      const res = await fetch("/api/service", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Service deleted successfully!");
        getServices();
      } else {
        toast.info(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalServices}
              </p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon
                icon={faHome}
                className="w-5 h-5 text-blue-600"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-gray-900">
                {activeServices}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon
                icon={faStar}
                className="w-5 h-5 text-green-600"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-900">
                {totalBookings}
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon
                icon={faCalendarCheck}
                className="w-5 h-5 text-purple-600"
              />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalRevenue}
              </p>
            </div>
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <FontAwesomeIcon
                icon={faDollarSign}
                className="w-5 h-5 text-yellow-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
            />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-gary-500 placeholder:text-gray-500 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            {/* Category Select */}
            <div className="relative">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none px-4 py-2 pr-8 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {/* Custom Arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex border text-gray-500 border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-4 py-2 transition-colors duration-200 ${
                  viewMode === "grid"
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-4 py-2 transition-colors duration-200 ${
                  viewMode === "list"
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service: any) => (
            <ServiceCard
              key={service._id}
              service={service}
              handleClickEdit={() => openEditModal(service)}
              handleClickDelete={() => handleDeleteService(service._id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredServices?.map((service: any) => (
                  <tr
                    key={service._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white mr-3">
                          <FontAwesomeIcon
                            icon={categoryIcons[service.category]}
                            className="w-5 h-5"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {service.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {service.description.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 capitalize">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {service.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {service.duration}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          service.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {service.status.charAt(0).toUpperCase() +
                          service.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                          onClick={() => openEditModal(service)}
                        >
                          <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                          onClick={() => handleDeleteService(service._id)}
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
        </div>
      )}

      <button
        onClick={() => {
          setEditData(null);
          setShowModal(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 z-50"
        aria-label="Add Service"
      >
        <FontAwesomeIcon icon={faPlus} className="w-6 h-6" />
      </button>

      <AddServiceModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onAddService={handleAddService}
        onEditService={handleEditService}
        editData={editData}
      />
    </div>
  );
}
