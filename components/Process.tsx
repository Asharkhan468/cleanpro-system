'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCalendarCheck,
  faClipboardList,
  faBrush,
  faCreditCard,
  faPhone,
  faCheckCircle,
  faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from 'react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      id: 1,
      icon: faCalendarCheck,
      title: "Book Online",
      description: "Schedule your cleaning service in seconds with our easy online booking system.",
      details: [
        "Choose service type",
        "Pick date & time",
        "Select preferred cleaner"
      ],
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      id: 2,
      icon: faPhone,
      title: "Get Confirmation",
      description: "Receive instant confirmation and a reminder before your scheduled cleaning.",
      details: [
        "Instant booking confirmation",
        "24h reminder",
        "Free cancellation"
      ],
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      id: 3,
      icon: faBrush,
      title: "Professional Cleaning",
      description: "Our expert team arrives on time with eco-friendly equipment and supplies.",
      details: [
        "Trained professionals",
        "Eco-friendly products",
        "Quality checklist"
      ],
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      id: 4,
      icon: faCheckCircle,
      title: "Quality Check",
      description: "We inspect every detail to ensure your complete satisfaction.",
      details: [
        "100% satisfaction guarantee",
        "Detailed inspection",
        "Immediate touch-ups"
      ],
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section id='process' ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-64 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-semibold text-blue-600">SIMPLE PROCESS</span>
          </div>
          <h2 className="text-4xl text-gray-500 md:text-5xl font-bold mb-6">
            How It{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Four simple steps to a cleaner, healthier space. We've made the process effortless.
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200"></div>
          
          <div className="grid lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative transform transition-all duration-1000 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
                onMouseEnter={() => setActiveStep(step.id)}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.color} text-white flex items-center justify-center font-bold text-sm shadow-lg`}>
                    {step.id}
                  </div>
                </div>

                {/* Content Card */}
                <div className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 ${
                  activeStep === step.id ? `border-${step.color.split('-')[1]}-500` : 'border-transparent'
                }`}>
                  {/* Icon */}
                  <div className={`w-20 h-20 ${step.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                    <FontAwesomeIcon icon={step.icon} className={`${step.iconColor} text-3xl`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-center mb-6">
                    {step.description}
                  </p>

                  {/* Details List */}
                  <div className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-gray-600">
                        <FontAwesomeIcon icon={faCheckCircle} className={`text-${step.color.split('-')[1]}-500 mr-2 text-sm`} />
                        <span className="text-sm">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-24 -right-4 z-20">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <FontAwesomeIcon icon={faArrowRight} className="text-gray-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '10K+', label: 'Happy Customers', icon: faCheckCircle, color: 'text-green-500' },
            { value: '98%', label: 'Satisfaction Rate', icon: faCheckCircle, color: 'text-blue-500' },
            { value: '24/7', label: 'Customer Support', icon: faCheckCircle, color: 'text-purple-500' },
            { value: '30min', label: 'Response Time', icon: faCheckCircle, color: 'text-orange-500' }
          ].map((stat, idx) => (
            <div key={idx} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl">
                <FontAwesomeIcon icon={stat.icon} className={`${stat.color} text-3xl mb-3 group-hover:rotate-12 transition-transform`} />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center bg-blue-600 text-white rounded-full px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
            <FontAwesomeIcon icon={faCalendarCheck} className="mr-3 text-xl" />
            <span className="font-semibold text-lg">Start Your Cleaning Journey</span>
            <FontAwesomeIcon icon={faArrowRight} className="ml-3" />
          </div>
          <p className="text-gray-500 mt-4 text-sm">No credit card required for booking</p>
        </div>
      </div>
    </section>
  );
}