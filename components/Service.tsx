// "use client";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faHome,
//   faBuilding,
//   faCar,
//   faWind,
//   faSnowflake,
//   faShield,
//   faArrowRight,
//   faStar,
// } from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Services() {
//   const [hoveredCard, setHoveredCard] = useState(null);
//   const router = useRouter();

//   const services = [
//     {
//       id: 1,
//       icon: faHome,
//       title: "Residential Cleaning",
//       description:
//         "Deep cleaning for your home with eco-friendly products and attention to every detail.",
//       price: "From $99",
//       features: ["Bedrooms", "Bathrooms", "Kitchen", "Living Room"],
//       color: "from-blue-500 to-blue-600",
//       shadowColor: "shadow-blue-500/20",
//     },
//     {
//       id: 2,
//       icon: faBuilding,
//       title: "Commercial Cleaning",
//       description:
//         "Professional cleaning solutions for offices, retail spaces, and commercial properties.",
//       price: "Custom Quote",
//       features: ["Offices", "Restrooms", "Common Areas", "Windows"],
//       color: "from-purple-500 to-purple-600",
//       shadowColor: "shadow-purple-500/20",
//     },
//     {
//       id: 3,
//       icon: faCar,
//       title: "Car Detailing",
//       description:
//         "Complete interior and exterior detailing to make your vehicle showroom-ready.",
//       price: "From $149",
//       features: [
//         "Exterior Wash",
//         "Interior Vacuum",
//         "Wax Polish",
//         "Tire Shine",
//       ],
//       color: "from-green-500 to-green-600",
//       shadowColor: "shadow-green-500/20",
//     },
//     {
//       id: 4,
//       icon: faWind,
//       title: "Carpet Cleaning",
//       description:
//         "Steam cleaning and stain removal to refresh and extend the life of your carpets.",
//       price: "From $79",
//       features: ["Stain Removal", "Deodorizing", "Sanitizing", "Fast Drying"],
//       color: "from-orange-500 to-orange-600",
//       shadowColor: "shadow-orange-500/20",
//     },
//     {
//       id: 5,
//       icon: faSnowflake,
//       title: "AC Duct Cleaning",
//       description:
//         "Improve air quality and system efficiency with professional duct cleaning.",
//       price: "From $199",
//       features: [
//         "Vent Cleaning",
//         "Filter Change",
//         "Mold Prevention",
//         "Air Quality Test",
//       ],
//       color: "from-cyan-500 to-cyan-600",
//       shadowColor: "shadow-cyan-500/20",
//     },
//     {
//       id: 6,
//       icon: faShield,
//       title: "Move In/Out",
//       description:
//         "Comprehensive cleaning for moving in or out of your property.",
//       price: "From $149",
//       features: ["Full Home", "Refrigerator", "Oven", "Cabinets"],
//       color: "from-red-500 to-red-600",
//       shadowColor: "shadow-red-500/20",
//     },
//   ];

//   return (
//     <section
//       id="services"
//       className="py-16 sm:py-20 md:py-24 bg-white relative overflow-hidden"
//     >
//       {/* Background Decoration */}
//       <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white"></div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
//           <div className="inline-flex items-center bg-blue-50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-4 sm:mb-6">
//             <FontAwesomeIcon
//               icon={faStar}
//               className="text-yellow-400 mr-1.5 sm:mr-2 text-sm sm:text-base"
//             />
//             <span className="text-xs sm:text-sm font-semibold text-blue-600">
//               OUR SERVICES
//             </span>
//           </div>
//           <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-500 font-bold mb-4 sm:mb-6 px-4 sm:px-0">
//             Professional Cleaning{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent whitespace-nowrap">
//               Solutions
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg md:text-xl text-gray-600 px-4 sm:px-8 md:px-12">
//             Choose from our comprehensive range of cleaning services tailored to
//             meet your specific needs.
//           </p>
//         </div>

//         {/* Services Grid */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {services.map((service: any) => (
//             <div
//               key={service.id}
//               className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden w-full"
//               onMouseEnter={() => setHoveredCard(service.id)}
//               onMouseLeave={() => setHoveredCard(null)}
//             >
//               {/* Hover Effect Background */}
//               <div
//                 className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
//               ></div>

//               {/* Top Accent Line */}
//               <div className={`h-1 bg-gradient-to-r ${service.color}`}></div>

//               <div className="p-5 sm:p-6 md:p-8">
//                 {/* Icon with Gradient Background */}
//                 <div
//                   className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 sm:mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg ${service.shadowColor}`}
//                 >
//                   <FontAwesomeIcon
//                     icon={service.icon}
//                     className="text-white text-xl sm:text-2xl"
//                   />
//                 </div>

//                 {/* Title and Price */}
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
//                   <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//                     {service.title}
//                   </h3>
//                   <span className="text-base sm:text-lg font-semibold text-blue-600">
//                     {service.price}
//                   </span>
//                 </div>

//                 {/* Description */}
//                 <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
//                   {service.description}
//                 </p>

//                 {/* Features List */}
//                 <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
//                   {service.features.map((feature: any, idx: any) => (
//                     <div
//                       key={idx}
//                       className="flex items-center text-gray-600 text-sm sm:text-base"
//                     >
//                       <div
//                         className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-2 flex-shrink-0`}
//                       ></div>
//                       <span className="truncate">{feature}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Book Now Button */}
//                 <button
//                   onClick={() =>
//                     router.push(
//                       `/booking?id=${service.id}&name=${encodeURIComponent(service.title)}&price=${encodeURIComponent(service.price)}`,
//                     )
//                   }
//                   className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 group-hover:shadow-lg flex items-center justify-center text-sm sm:text-base"
//                 >
//                   Book Now
//                   <FontAwesomeIcon
//                     icon={faArrowRight}
//                     className="ml-2 group-hover:translate-x-1 transition-transform text-xs sm:text-sm"
//                   />
//                 </button>
//               </div>

//               {/* Popular Badge (for first card) */}
//               {service.id === 1 && (
//                 <div className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
//                   MOST POPULAR
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faCar,
  faWind,
  faSnowflake,
  faShield,
  faArrowRight,
  faStar,
  faCheckCircle,
  faClock,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const services = [
    {
      id: 1,
      icon: faHome,
      title: "Residential Cleaning",
      description:
        "Deep cleaning for your home with eco-friendly products and attention to every detail.",
      price: "$99",
      priceDetail: "starting from",
      features: ["Bedrooms", "Bathrooms", "Kitchen", "Living Room"],
      color: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/20",
      duration: "2-3 hours",
      guarantee: "100% Satisfaction",
    },
    {
      id: 2,
      icon: faBuilding,
      title: "Commercial Cleaning",
      description:
        "Professional cleaning solutions for offices, retail spaces, and commercial properties.",
      price: "Custom",
      priceDetail: "quote available",
      features: ["Offices", "Restrooms", "Common Areas", "Windows"],
      color: "from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/20",
      duration: "Flexible schedule",
      guarantee: "Business insured",
    },
    {
      id: 3,
      icon: faCar,
      title: "Car Detailing",
      description:
        "Complete interior and exterior detailing to make your vehicle showroom-ready.",
      price: "$149",
      priceDetail: "starting from",
      features: ["Exterior Wash", "Interior Vacuum", "Wax Polish", "Tire Shine"],
      color: "from-green-500 to-green-600",
      shadowColor: "shadow-green-500/20",
      duration: "1.5-2 hours",
      guarantee: "Premium products",
    },
    {
      id: 4,
      icon: faWind,
      title: "Carpet Cleaning",
      description:
        "Steam cleaning and stain removal to refresh and extend the life of your carpets.",
      price: "$79",
      priceDetail: "starting from",
      features: ["Stain Removal", "Deodorizing", "Sanitizing", "Fast Drying"],
      color: "from-orange-500 to-orange-600",
      shadowColor: "shadow-orange-500/20",
      duration: "1-2 hours",
      guarantee: "Deep clean",
    },
    {
      id: 5,
      icon: faSnowflake,
      title: "AC Duct Cleaning",
      description:
        "Improve air quality and system efficiency with professional duct cleaning.",
      price: "$199",
      priceDetail: "starting from",
      features: ["Vent Cleaning", "Filter Change", "Mold Prevention", "Air Quality Test"],
      color: "from-cyan-500 to-cyan-600",
      shadowColor: "shadow-cyan-500/20",
      duration: "2-4 hours",
      guarantee: "Energy efficient",
    },
    {
      id: 6,
      icon: faShield,
      title: "Move In/Out",
      description:
        "Comprehensive cleaning for moving in or out of your property.",
      price: "$149",
      priceDetail: "starting from",
      features: ["Full Home", "Refrigerator", "Oven", "Cabinets"],
      color: "from-red-500 to-red-600",
      shadowColor: "shadow-red-500/20",
      duration: "3-5 hours",
      guarantee: "Move-in ready",
    },
  ];

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
            Experience the highest quality cleaning services tailored to your unique needs. 
            Professional, reliable, and eco-friendly solutions for every space.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7 lg:gap-8">
          {services.map((service:any) => (
            <div
              key={service.id}
              className="group relative transform transition-all duration-500 hover:-translate-y-2"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col">
                
                {/* Animated Gradient Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl`}></div>
                
                {/* Card Content */}
                <div className="relative bg-white rounded-2xl m-px flex flex-col h-full">
                  
                  {/* Top Accent Bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${service.color} transform origin-left transition-transform duration-500 group-hover:scale-x-110`}></div>

                  {/* Content Padding */}
                  <div className="p-6 sm:p-7 md:p-8 flex flex-col flex-grow">
                    
                    {/* Icon Section */}
                    <div className="flex justify-between items-start mb-5">
                      <div
                        className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${service.shadowColor}`}
                      >
                        <FontAwesomeIcon
                          icon={service.icon}
                          className="text-white text-xl sm:text-2xl"
                        />
                      </div>
                      
                      {/* Price Badge */}
                      <div className="text-right">
                        <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>
                          {service.price}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">
                          {service.priceDetail}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Quick Info Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                        <FontAwesomeIcon icon={faClock} className="w-3 h-3 text-blue-500" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg text-xs text-gray-600">
                        <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3 text-green-500" />
                        <span>{service.guarantee}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-2 gap-2.5 mb-6">
                      {service.features.map((feature:any, idx:any) => (
                        <div
                          key={idx}
                          className="flex items-center text-gray-700 text-sm group/feature"
                        >
                          <div
                            className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-2 flex-shrink-0 group-hover/feature:scale-125 transition-transform`}
                          ></div>
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <button
                      onClick={() =>
                        router.push(
                          `/booking?id=${service.id}&name=${encodeURIComponent(service.title)}&price=${encodeURIComponent(service.price)}`
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

                  {/* Popular Badge */}
                  {service.badge && (
                    <div className="absolute -top-2 -right-2">
                      <div className={`bg-gradient-to-r ${service.color} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
                        {service.badge}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
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
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
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