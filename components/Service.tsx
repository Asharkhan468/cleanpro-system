"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome,
  faBuilding,
  faCar,
  faWind,
  faSnowflake,
  faShield,
  faClock,
  faLeaf,
  faArrowRight,
  faStar
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Services() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const services = [
    {
      id: 1,
      icon: faHome,
      title: "Residential Cleaning",
      description: "Deep cleaning for your home with eco-friendly products and attention to every detail.",
      price: "From $99",
      features: ["Bedrooms", "Bathrooms", "Kitchen", "Living Room"],
      color: "from-blue-500 to-blue-600",
      shadowColor: "shadow-blue-500/20"
    },
    {
      id: 2,
      icon: faBuilding,
      title: "Commercial Cleaning",
      description: "Professional cleaning solutions for offices, retail spaces, and commercial properties.",
      price: "Custom Quote",
      features: ["Offices", "Restrooms", "Common Areas", "Windows"],
      color: "from-purple-500 to-purple-600",
      shadowColor: "shadow-purple-500/20"
    },
    {
      id: 3,
      icon: faCar,
      title: "Car Detailing",
      description: "Complete interior and exterior detailing to make your vehicle showroom-ready.",
      price: "From $149",
      features: ["Exterior Wash", "Interior Vacuum", "Wax Polish", "Tire Shine"],
      color: "from-green-500 to-green-600",
      shadowColor: "shadow-green-500/20"
    },
    {
      id: 4,
      icon: faWind,
      title: "Carpet Cleaning",
      description: "Steam cleaning and stain removal to refresh and extend the life of your carpets.",
      price: "From $79",
      features: ["Stain Removal", "Deodorizing", "Sanitizing", "Fast Drying"],
      color: "from-orange-500 to-orange-600",
      shadowColor: "shadow-orange-500/20"
    },
    {
      id: 5,
      icon: faSnowflake,
      title: "AC Duct Cleaning",
      description: "Improve air quality and system efficiency with professional duct cleaning.",
      price: "From $199",
      features: ["Vent Cleaning", "Filter Change", "Mold Prevention", "Air Quality Test"],
      color: "from-cyan-500 to-cyan-600",
      shadowColor: "shadow-cyan-500/20"
    },
    {
      id: 6,
      icon: faShield,
      title: "Move In/Out",
      description: "Comprehensive cleaning for moving in or out of your property.",
      price: "From $149",
      features: ["Full Home", "Refrigerator", "Oven", "Cabinets"],
      color: "from-red-500 to-red-600",
      shadowColor: "shadow-red-500/20"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-50 via-white to-white"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-6">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <span className="text-sm font-semibold text-blue-600">OUR SERVICES</span>
          </div>
          <h2 className="text-4xl text-gray-500 md:text-5xl font-bold mb-6">
            Professional Cleaning{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Choose from our comprehensive range of cleaning services tailored to meet your specific needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service:any) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Top Accent Line */}
              <div className={`h-1 bg-gradient-to-r ${service.color}`}></div>
              
              <div className="p-8">
                {/* Icon with Gradient Background */}
                <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 shadow-lg ${service.shadowColor}`}>
                  <FontAwesomeIcon icon={service.icon} className="text-white text-2xl" />
                </div>

                {/* Title and Price */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                  <span className="text-lg font-semibold text-blue-600">{service.price}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-6">{service.description}</p>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature:any, idx:any) => (
                    <div key={idx} className="flex items-center text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-2`}></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Book Now Button */}
                <button  onClick={() =>
    router.push(
      `/booking?id=${service.id}&name=${encodeURIComponent(service.title)}&price=${encodeURIComponent(service.price)}`
    )
  } className="w-full px-4 py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all duration-300 group-hover:shadow-lg flex items-center justify-center">
                  Book Now
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Popular Badge (for first card) */}
              {service.id === 1 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Need a custom cleaning plan?</p>
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Custom Quote
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}