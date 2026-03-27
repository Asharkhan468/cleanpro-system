"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faEye,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import BookingModal from "@/components/admin/BookingModal";
import { toast } from "react-toastify";

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBookingId, setEditingBookingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [bookings, setBookings] = useState<any>([]);

  const getBookings = async () => {
    try {
      const res = await fetch("/api/booking");
      const data = await res.json();
      if (!data.success) {
        toast.error("Failed to fetch bookings");
        return;
      }
      setBookings(data.bookings);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleViewBooking = (booking: any) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const res = await fetch("/api/booking", {
        method: "DELETE",
        body: JSON.stringify({ bookingId }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      toast.success(data.message);
      getBookings(); // Refresh bookings
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdateStatus = async (bookingId: string, status: string) => {
    try {
      const res = await fetch("/api/booking", {
        method: "PATCH",
        body: JSON.stringify({ bookingId, status }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      toast.success(data.message);
      setEditingBookingId(null);
      getBookings(); // Refresh bookings
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Filter bookings based on status and search
  const filteredBookings = bookings.filter((booking: any) => {
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch =
      (booking.bookingId || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (booking.firstName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (booking.service?.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  //   // Stats
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (b: any) => b.status === "Pending",
  ).length;
  const confirmedBookings = bookings.filter(
    (b: any) => b.status === "Confirmed",
  ).length;
  const completedBookings = bookings.filter(
    (b: any) => b.status === "Completed",
  ).length;

  return (
    <div className="space-y-6">
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
          <p className="text-2xl font-bold text-gray-900">
            {confirmedBookings}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-gray-900">
            {completedBookings}
          </p>
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
              placeholder="Search by ID, customer, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-gray-500 placeholder:text-gray-500 pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative inline-block w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="all" className="text-gray-700">
                  All Status
                </option>
                <option value="pending" className="text-yellow-700">
                  Pending
                </option>
                <option value="confirmed" className="text-green-700">
                  Confirmed
                </option>
                <option value="completed" className="text-blue-700">
                  Completed
                </option>
                <option value="cancelled" className="text-red-700">
                  Cancelled
                </option>
              </select>

              {/* Custom down arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="h-4 w-4"
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
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking: any) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {booking.bookingId}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {booking.firstName?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {booking.firstName} {booking.lastName}
                        </p>
                        <p className="text-xs text-gray-500">{booking.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {booking.service?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {booking.serviceDate}
                    </div>
                    <div className="text-xs text-gray-500">
                      {booking.serviceTime}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingBookingId === booking.bookingId ? (
                      <div className="relative inline-block w-32">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleUpdateStatus(
                              booking.bookingId,
                              e.target.value,
                            )
                          }
                          className={`w-full appearance-none bg-white border border-gray-300 text-gray-700 py-1.5 px-3 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                        >
                          <option value="Pending" className="text-yellow-700">
                            Pending
                          </option>
                          <option value="Confirmed" className="text-green-700">
                            Confirmed
                          </option>
                          <option value="Completed" className="text-blue-700">
                            Completed
                          </option>
                          <option value="Cancelled" className="text-red-700">
                            Cancelled
                          </option>
                        </select>
                        {/* Down arrow icon */}
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                          <svg
                            className="h-4 w-4"
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
                    ) : (
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {booking.service?.price}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="View"
                      >
                        <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
                      </button>

                      <button
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        onClick={() => setEditingBookingId(booking.bookingId)}
                        title="Edit Status"
                      >
                        <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                      </button>

                      <button
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                        onClick={() => handleDeleteBooking(booking.bookingId)}
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
      </div>

      {showModal && selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
