"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState , useEffect } from "react";
import {
  faChartPie,
  faCalendarCheck,
  faConciergeBell,
  faUsers,
  faCog,
  faSignOutAlt,
  faChevronLeft,
  faChevronRight,
  faHome,
  faBell,
  faCreditCard,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { path: "/admin", name: "Dashboard", icon: faChartPie },
    { path: "/admin/bookings", name: "Bookings", icon: faCalendarCheck },
    { path: "/admin/services", name: "Services", icon: faConciergeBell },
  ];

  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 z-40 hidden lg:block ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Logo Area */}
        <div
          className={`flex items-center h-16 px-4 border-b border-gray-700 ${isOpen ? "justify-between" : "justify-center"}`}
        >
          {isOpen ? (
            <>
              <span className="text-xl font-bold text-white">Clean Pro</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsOpen(true)}
              className="p-1 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`flex items-center ${isOpen ? "px-4" : "px-0 justify-center"} py-3 rounded-xl transition-all ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`w-5 h-5 ${isOpen ? "mr-3" : ""}`}
                    />
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700`}
        >
          <div
            className={`flex items-center ${isOpen ? "space-x-3" : "justify-center"}`}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold">A</span>
            </div>
            {isOpen && (
              <div className="flex-1">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-gray-400">{email}</p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
