"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faCar,
  faWind,
  faSnowflake,
  faShield,
  faWrench,
  faArrowRight,
  faBolt,
  faBroom,
  faStar,
  faCheckCircle,
  faClock,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();
  const [packagesData, setPackagesData] = useState([]);

  const getServices = async () => {
    try {
      const res = await fetch("/api/service");
      const data = await res.json();
      setPackagesData(data.data);
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
  }, []);

  console.log(packagesData);

  const getServiceIcon = (category: any, name: any) => {
    const iconMap: Record<string, any> = {
      commercial: faBuilding,
      residential: faHome,
      plumbing: faWrench,
      electrical: faBolt,
      cleaning: faBroom,
    };
    return (
      iconMap[category?.toLowerCase()] ||
      iconMap[name?.toLowerCase()] ||
      faWrench
    );
  };

  const getServiceColor = (category: any) => {
    const colorMap: Record<string, string> = {
      commercial: "from-purple-500 to-pink-500",
      residential: "from-blue-500 to-cyan-500",
      plumbing: "from-cyan-500 to-blue-500",
      electrical: "from-yellow-500 to-orange-500",
      cleaning: "from-green-500 to-emerald-500",
    };
    return colorMap[category?.toLowerCase()] || "from-blue-500 to-cyan-500";
  };

  return (
    <section
      id="services"
      className="py-20 sm:py-24 md:py-28 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-4 sm:px-5 py-2 sm:py-2.5 mb-6 shadow-sm">
            <FontAwesomeIcon
              icon={faStar}
              className="text-yellow-500 text-sm sm:text-base animate-pulse"
            />
            <span className="text-xs sm:text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PREMIUM CLEANING SERVICES
            </span>
          </div>

          <h2 className="text-3xl text-gray-500 sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 px-4">
            Professional Cleaning{" "}
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Experience the highest quality cleaning services tailored to your
            unique needs. Professional, reliable, and eco-friendly solutions for
            every space.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {packagesData.map((service: any) => {
            const serviceIcon = getServiceIcon(service.category, service.name);
            const serviceColor = getServiceColor(service.category);

            return (
              <div
                key={service._id}
                className="group relative transform transition-all duration-500 hover:-translate-y-2"
                onMouseEnter={() => setHoveredCard(service._id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card Container */}
                <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                  {/* Animated Gradient Border */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${serviceColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`}
                  ></div>

                  {/* Card Content */}
                  <div className="relative bg-white rounded-2xl m-px flex flex-col h-full">
                    {/* Top Accent Bar */}
                    <div
                      className={`h-1.5 bg-gradient-to-r ${serviceColor} transform origin-left transition-transform duration-500 group-hover:scale-x-110`}
                    ></div>

                    {/* Content Padding */}
                    <div className="p-6 sm:p-7 md:p-8 flex flex-col flex-grow">
                      {/* Icon Section */}
                      <div className="flex justify-between items-start mb-5">
                        <div
                          className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${serviceColor} rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/20`}
                        >
                          <FontAwesomeIcon
                            icon={serviceIcon}
                            className="text-white text-xl sm:text-2xl"
                          />
                        </div>

                        {/* Price Badge */}
                        <div className="text-right">
                          <div
                            className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${serviceColor} bg-clip-text text-transparent`}
                          >
                            ${service.price}
                          </div>
                          <div className="text-xs text-gray-500 mt-0.5">
                            {service.duration}
                          </div>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                        {service.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Quick Info Tags */}
                      <div className="flex flex-wrap gap-2 mb-5">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                          <FontAwesomeIcon
                            icon={faClock}
                            className="w-3 h-3 text-blue-500"
                          />
                          <span>{service.duration}</span>
                        </div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="w-3 h-3 text-green-500"
                          />
                          <span>Professional</span>
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="mb-6">
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                          <span className="capitalize">{service.category}</span>
                        </div>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() =>
                          router.push(
                            `/booking?id=${service._id}&name=${encodeURIComponent(service.name)}&price=${encodeURIComponent(service.price)}`,
                          )
                        }
                        className="mt-auto w-full px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 group/btn flex items-center justify-center gap-2 border border-gray-200 hover:border-transparent"
                      >
                        <span className="text-sm sm:text-base">Book Now</span>
                        <FontAwesomeIcon
                          icon={faArrowRight}
                          className="text-xs group-hover/btn:translate-x-1 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 sm:mt-20">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-shadow">
            <FontAwesomeIcon icon={faCalendarCheck} className="text-blue-500" />
            <span className="text-gray-700">Need a custom cleaning plan?</span>
            <button
              onClick={() => router.push("/contact")}
              className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              Contact us →
            </button>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
