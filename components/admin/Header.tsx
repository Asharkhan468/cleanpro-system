"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faBars,
  faTimes,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [pageName, setPageName] = useState("Dashboard");
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      setPageName("Dashboard");
    } else if (pathname === "/admin/services") {
      setPageName("Services");
    } else if (pathname === "/admin/profile") {
      setPageName("Profile");
    } else if (pathname === "/admin/bookings") {
      setPageName("Bookings");
    } else {
      setPageName("Dashboard");
    }
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target as Node)
      ) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        localStorage.removeItem("admin");
        localStorage.removeItem("adminEmail");
        router.push("/admin/login");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (err) {
      toast.error("Server error during logout");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch("/api/notification");
        const data = await res.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      setNotifications((prev: any) =>
        prev.filter((item: any) => item._id !== id),
      );
      toast.success("Notification marked as read");
    } catch (error) {
      console.error("Error updating notification", error);
      toast.error("Failed to mark notification as read");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality here
      console.log("Searching for:", searchQuery);
      setShowMobileSearch(false);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2">
          {/* Left Section */}
          <div className="flex items-center flex-1 min-w-0">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-2 sm:mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors active:bg-gray-200"
              aria-label="Toggle sidebar"
            >
              <FontAwesomeIcon
                icon={faBars}
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
              />
            </button>

            {/* Page Title - Mobile */}
            <h1 className=" text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent truncate">
              {pageName}
            </h1>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <p></p>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Mobile Search Button */}

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors active:bg-gray-200"
                aria-label="Notifications"
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600"
                />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 max-w-[320px] sm:max-w-none bg-white rounded-lg shadow-xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                      {notifications.length > 0 && (
                        <span className="ml-2 text-xs text-gray-500">
                          ({notifications.length})
                        </span>
                      )}
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((item: any) => (
                        <div
                          key={item._id}
                          onClick={() => markAsRead(item._id)}
                          className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors"
                        >
                          <p className="text-sm text-gray-800">
                            {item.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(item.createdAt).toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-sm text-gray-500">
                        <p>No notifications</p>
                        <p className="text-xs mt-1">You're all caught up!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 sm:gap-3 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors active:bg-gray-200"
                aria-label="Profile menu"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                  <span className="text-xs sm:text-sm font-bold">A</span>
                </div>
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  Admin
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="hidden sm:block w-3 h-3 sm:w-4 sm:h-4 text-gray-500"
                />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
                  <div className="py-2">
                    <Link
                      href="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile Settings
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Modal */}
      {showMobileSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div ref={mobileSearchRef} className="bg-white p-4">
            <div className="flex items-center gap-2">
              <form onSubmit={handleSearch} className="flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
              </form>
              <button
                onClick={() => setShowMobileSearch(false)}
                className="p-3 text-gray-600 hover:bg-gray-100 rounded-lg"
                aria-label="Close search"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
