"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faChevronDown,
  faBars,
  faCalendarAlt,
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
  const [pageName, setPageName] = useState("Dashboard");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/admin") {
      setPageName("Dashboard");
    } else if (pathname === "/admin/services") {
      setPageName("Services");
    } else if(pathname ==="/admin/profile"){
      setPageName("Profile")
    }
    else {
      setPageName("Bookings");
    }
  }, [pathname]);

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

        router.push("/admin/login");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (err) {
      toast.error("Server error during logout");
      console.error(err);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faBars}
                className="w-5 h-5 text-gray-600"
              />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {pageName}
                </h1>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100"
              >
                <FontAwesomeIcon
                  icon={faBell}
                  className="w-5 h-5 text-gray-600"
                />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-4 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <p className="text-sm text-gray-800">
                          New booking received
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          2 minutes ago
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-100">
                    <button className="text-sm text-blue-600 hover:text-blue-700">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
                  <span className="text-sm font-bold">A</span>
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-700">
                  Admin
                </span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="hidden md:block w-4 h-4 text-gray-500"
                />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
                  <div className="py-2">
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Profile
                    </a>
                    
                    <hr className="my-2 border-gray-100" />
                    <button onClick={handleLogout}>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </a>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
