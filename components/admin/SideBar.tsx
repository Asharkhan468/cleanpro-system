"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import {
  faChartPie,
  faCalendarCheck,
  faConciergeBell,
  faChevronLeft,
  faChevronRight,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: faChartPie },
    { path: "/admin/bookings", name: "Bookings", icon: faCalendarCheck },
    { path: "/admin/services", name: "Services", icon: faConciergeBell },
    { path: "/admin/profile", name: "Profile", icon: faUser },
  ];

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
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

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0  z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 z-50 ${
          isOpen ? "w-64" : "w-0 lg:w-20"
        } overflow-hidden lg:overflow-visible`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Area */}
          <div
            className={`flex items-center h-16 px-4 border-b border-gray-700 ${
              isOpen ? "justify-between" : "justify-center"
            }`}
          >
            {isOpen ? (
              <>
                <span className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Clean Pro
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
                  aria-label="Collapse sidebar"
                >
                  <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsOpen(true)}
                className="p-1 rounded-lg hover:bg-gray-700 transition-colors lg:flex hidden"
                aria-label="Expand sidebar"
              >
                <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => {
                        if (window.innerWidth < 1024) {
                          setIsOpen(false);
                        }
                      }}
                      className={`flex items-center ${
                        isOpen ? "px-4" : "px-0 justify-center"
                      } py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className={`w-5 h-5 ${isOpen ? "mr-3" : ""} ${
                          isActive ? "text-white" : "group-hover:text-white"
                        }`}
                      />
                      {isOpen && (
                        <span className="text-sm font-medium">{item.name}</span>
                      )}
                      {!isOpen && (
                        <div className="absolute left-20 ml-6 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 hidden lg:block">
                          {item.name}
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700">
            <div
              className={`flex items-center ${
                isOpen ? "space-x-3" : "justify-center"
              }`}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold">A</span>
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Admin</p>
                  <p className="text-xs text-gray-400 truncate">{email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
