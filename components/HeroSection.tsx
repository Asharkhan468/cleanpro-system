"use client";
import { useState, useEffect } from "react";
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
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const phrases = [
    "Professional Cleaning",
    "Eco-Friendly Solutions",
    "Spotless Results",
    "Affordable Rates",
  ];

  // Smoother timing values
  const typingSpeed = 80;
  const deletingSpeed = 40;
  const pauseTime = 2000;

  useEffect(() => {
    const currentPhrase = phrases[loopNum % phrases.length];

    const timer = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentPhrase.length) {
            setDisplayText(currentPhrase.substring(0, displayText.length + 1));
            setIsTypingComplete(false);
          } else {
            setIsTypingComplete(true);
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(currentPhrase.substring(0, displayText.length - 1));
            setIsTypingComplete(false);
          } else {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    );

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum]);

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
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm border border-gray-100 mx-auto lg:mx-0 animate-fade-in-up">
              <FontAwesomeIcon
                icon={faStar}
                className="text-yellow-400 mr-1.5 sm:mr-2 text-sm sm:text-base"
              />
              <span className="text-xs sm:text-sm font-medium text-gray-700">
                Trusted by 10,000+ happy customers
              </span>
            </div>

            {/* Main Heading with Typing Effect */}
            <div className="animate-fade-in-up animation-delay-100">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <div className="text-gray-900 inline-block">
                  {displayText}
                  <span
                    className={`${isTypingComplete ? "animate-blink-smooth" : "animate-pulse"} ml-1`}
                  >
                    |
                  </span>
                </div>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-fade-in-up animation-delay-300">
                  For Your Home
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-500">
              Experience the sparkle of a professionally cleaned space. Our
              eco-friendly cleaning solutions make your home shine while keeping
              your family safe.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-700">
              <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-base sm:text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center relative overflow-hidden">
                <span className="relative z-10">Book Now</span>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="ml-2 group-hover:translate-x-1 transition-transform duration-300 relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 rounded-full font-semibold text-base sm:text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200 flex items-center justify-center group">
                <FontAwesomeIcon
                  icon={faPlay}
                  className="mr-2 text-blue-600 text-sm sm:text-base group-hover:scale-110 transition-transform duration-300"
                />
                Watch Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-4 sm:pt-6 md:pt-8 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 justify-center lg:justify-start animate-fade-in-up animation-delay-900">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center text-white font-semibold text-xs sm:text-sm transform hover:scale-110 transition-transform duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
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
                      className="w-3 h-3 sm:w-4 sm:h-4 animate-scale-in"
                      style={{ animationDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600 font-medium">
                  4.9 (2.5k reviews)
                </span>
              </div>
            </div>

            {/* Features - Responsive grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 sm:pt-6 md:pt-8 border-t border-gray-200 animate-fade-in-up animation-delay-1100">
              {[
                { value: "500+", label: "Cleanings Done" },
                { value: "100%", label: "Satisfaction" },
                { value: "24/7", label: "Support" },
              ].map((feature, index) => (
                <div key={index} className="text-center group">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {feature.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                    {feature.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image/Visual */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0 animate-fade-in-right">
            {/* Main Card */}
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition-all duration-700 ease-out mx-auto max-w-md lg:max-w-full hover:shadow-3xl">
              <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 animate-pulse-slow">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl sm:text-2xl font-bold animate-slide-up">
                    Premium Cleaning
                  </h3>
                  <p className="opacity-90 text-sm sm:text-base animate-slide-up animation-delay-100">
                    Starting at $99
                  </p>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                {[
                  { icon: faShield, text: "Fully insured & bonded", delay: 0 },
                  { icon: faClock, text: "Flexible scheduling", delay: 100 },
                  { icon: faLeaf, text: "Eco-friendly products", delay: 200 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4 group/item hover:transform hover:translate-x-2 transition-all duration-300"
                    style={{ animationDelay: `${item.delay}ms` }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover/item:bg-blue-100 transition-colors duration-300">
                      <FontAwesomeIcon
                        icon={item.icon}
                        className="text-blue-600 text-base sm:text-xl transform group-hover/item:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 md:-top-6 md:-right-6 bg-white rounded-lg shadow-xl p-2 sm:p-3 md:p-4 transform hover:scale-110 transition-all duration-500 max-w-[140px] sm:max-w-none animate-float">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center animate-pulse-slow">
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

            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 md:-bottom-4 md:-left-6 bg-white rounded-lg shadow-xl p-2 sm:p-3 md:p-4 transform hover:scale-110 transition-all duration-500 max-w-[140px] sm:max-w-none animate-float animation-delay-2000">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-blue-600 text-sm sm:text-base animate-spin-slow"
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

      {/* Custom animations */}
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

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        @keyframes blink-smooth {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-100 {
          animation-delay: 100ms;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-700 {
          animation-delay: 700ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        .animation-delay-1100 {
          animation-delay: 1100ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-pulse {
          animation: pulse 1s step-end infinite;
        }

        .animate-blink-smooth {
          animation: blink-smooth 1s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-scale-in {
          animation: scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
            forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-slide-up {
          animation: slideUp 0.5s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        /* Smooth transitions */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .hover\\:shadow-3xl:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
