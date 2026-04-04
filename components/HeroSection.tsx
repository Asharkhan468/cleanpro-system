"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faShield,
  faClock,
  faLeaf,
  faArrowRight,
  faCheck,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";

export default function Hero() {
  return (
    <div
      id="Home"
      className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Background decorative elements - hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="hidden md:block absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="hidden lg:block absolute bottom-20 left-20 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      {/* Grid pattern overlay */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm border border-gray-100 mx-auto lg:mx-0">
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400 mr-1.5 sm:mr-2 text-sm sm:text-base"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                Trusted by 10,000+ happy customers
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gray-900">Professional Cleaning </span>
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Services
              </span>
              <br />
              <span className="text-gray-900">For Your Home</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Experience the sparkle of a professionally cleaned space. Our
              eco-friendly cleaning solutions make your home shine while keeping
              your family safe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                Book Now
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="mr-2 text-blue-600 text-sm sm:text-base"
                />
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 sm:pt-6 md:pt-8 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 justify-center lg:justify-start">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white font-semibold text-xs sm:text-sm"
                  >
                    {i === 4 ? "+2k" : ""}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="flex text-yellow-400 gap-0.5 sm:gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600 font-medium">
                  4.9 (2.5k reviews)
                </span>
              </div>
            </div>

            {/* Features - Responsive grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  500+
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Cleanings Done
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  100%
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  Satisfaction
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Image/Visual */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Main Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 mx-auto max-w-md lg:max-w-full">
              <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
                {/* Decorative pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg
                    className="absolute left-0 top-0 h-full w-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 0 L100 100 M100 0 L0 100"
                      stroke="white"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold">
                    Premium Cleaning
                  </h3>
                  <p className="opacity-90 text-sm sm:text-base">
                    Starting at $99
                  </p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <FontAwesomeIcon
                    icon={faShield}
                    className="text-blue-600 text-base sm:text-xl"
                  />
                  <span className="text-sm sm:text-base text-gray-700">
                    Fully insured & bonded
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-blue-600 text-base sm:text-xl"
                  />
                  <span className="text-sm sm:text-base text-gray-700">
                    Flexible scheduling
                  </span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <FontAwesomeIcon
                    icon={faLeaf}
                    className="text-blue-600 text-base sm:text-xl"
                  />
                  <span className="text-sm sm:text-base text-gray-700">
                    Eco-friendly products
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Cards - Responsive positioning */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 bg-white rounded-lg shadow-xl p-2 sm:p-3 md:p-4 transform hover:scale-110 transition-transform duration-300 max-w-[140px] sm:max-w-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-600 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm sm:text-base">
                    Same Day
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Service Available
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-4 md:-left-6 bg-white rounded-lg shadow-xl p-2 sm:p-3 md:p-4 transform hover:scale-110 transition-transform duration-300 max-w-[140px] sm:max-w-none">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-blue-600 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm sm:text-base">
                    50% Off
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    First Cleaning
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations */}
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
