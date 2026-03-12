'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar,
  faStarHalfAlt,
  faQuoteLeft,
  faArrowLeft,
  faArrowRight,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Robert Thompson",
      role: "Homeowner",
      image: "RT",
      rating: 5,
      text: "Absolutely fantastic service! They transformed my home into something I never thought possible. The attention to detail was incredible, and they were so respectful of my space.",
      date: "2 weeks ago",
      service: "Deep Cleaning"
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Business Owner",
      image: "MG",
      rating: 5,
      text: "We've been using CleanPro for our office for over 3 years. They're reliable, thorough, and always go the extra mile. Our employees love coming to work on cleaning days!",
      date: "1 month ago",
      service: "Commercial Cleaning"
    },
    {
      id: 3,
      name: "James Wilson",
      role: "Property Manager",
      image: "JW",
      rating: 5,
      text: "Managing multiple properties is challenging, but CleanPro makes the cleaning part effortless. Their team is professional, punctual, and does amazing work every time.",
      date: "3 weeks ago",
      service: "Move Out Cleaning"
    },
    {
      id: 4,
      name: "Lisa Chen",
      role: "Mom of Twins",
      image: "LC",
      rating: 4.5,
      text: "With two toddlers and a dog, keeping our house clean seemed impossible. CleanPro has been a lifesaver! They're patient with our chaos and leave everything spotless.",
      date: "5 days ago",
      service: "Residential Cleaning"
    },
    {
      id: 5,
      name: "David Miller",
      role: "Real Estate Agent",
      image: "DM",
      rating: 5,
      text: "I recommend CleanPro to all my clients. Their move-in/move-out cleaning is exceptional and has helped countless clients get their full security deposits back.",
      date: "2 months ago",
      service: "Move In/Out"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating:any) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />);
      } else if (i - 0.5 === rating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <section id='testimonials' className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-6">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-2" />
            <span className="text-sm font-semibold text-blue-600">TESTIMONIALS</span>
          </div>
          <h2 className="text-4xl text-gray-500 md:text-5xl font-bold mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Customers Say
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            Don't just take our word for it - hear from our happy customers
          </p>
        </div>

        {/* Main Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-8 right-8 opacity-10">
              <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-blue-600" />
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Left Column - Profile */}
              <div className="md:w-1/3 text-center md:text-left">
                <div className="w-24 h-24 mx-auto md:mx-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
                  {testimonials[currentIndex].image}
                </div>
                <h3 className="font-bold text-xl text-gray-900">{testimonials[currentIndex].name}</h3>
                <p className="text-gray-600 mb-2">{testimonials[currentIndex].role}</p>
                <div className="flex justify-center md:justify-start gap-1 mb-2">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                <span className="inline-block bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full">
                  {testimonials[currentIndex].service}
                </span>
              </div>

              {/* Right Column - Testimonial */}
              <div className="md:w-2/3">
                <p className="text-xl text-gray-700 italic mb-6">
                  "{testimonials[currentIndex].text}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{testimonials[currentIndex].date}</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={prevSlide}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '10,000+', label: 'Happy Clients', color: 'from-blue-500 to-blue-600' },
            { value: '98%', label: 'Would Recommend', color: 'from-purple-500 to-purple-600' },
            { value: '4.9/5', label: 'Average Rating', color: 'from-green-500 to-green-600' },
            { value: '500+', label: '5-Star Reviews', color: 'from-orange-500 to-orange-600' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow">
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Google Reviews Preview */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-2xl">G</span>
              </div>
              <div>
                <h4 className="text-2xl font-bold">Excellent</h4>
                <div className="flex gap-1 my-1">
                  {[1,2,3,4,5].map(i => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm opacity-90">Based on 2,500+ reviews</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Read All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}