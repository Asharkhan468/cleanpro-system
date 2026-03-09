'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers,
  faTrophy,
  faHeart,
  faLeaf,
  faCheckCircle,
  faArrowRight,
  faQuoteRight,
  faClock,
  faShield
} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

export default function About() {
  const [activeTab, setActiveTab] = useState(0);

  const stats = [
    { value: '15+', label: 'Years Experience', icon: faClock },
    { value: '50K+', label: 'Homes Cleaned', icon: faHeart },
    { value: '100%', label: 'Satisfaction', icon: faTrophy },
    { value: 'Eco', label: 'Friendly', icon: faLeaf }
  ];

  const tabs = [
    {
      title: "Our Mission",
      content: "To provide exceptional cleaning services that enhance the quality of life for our clients while maintaining the highest standards of environmental responsibility."
    },
    {
      title: "Our Vision",
      content: "To become the most trusted and innovative cleaning service provider, setting new standards for excellence in the industry."
    },
    {
      title: "Our Values",
      content: "Integrity, excellence, environmental responsibility, and customer satisfaction guide everything we do."
    }
  ];

  const team = [
    { name: "Sarah Johnson", role: "Founder & CEO", image: "SJ", color: "from-blue-500 to-blue-600" },
    { name: "Michael Chen", role: "Operations Manager", image: "MC", color: "from-purple-500 to-purple-600" },
    { name: "Emily Rodriguez", role: "Head Trainer", image: "ER", color: "from-green-500 to-green-600" },
    { name: "David Kim", role: "Customer Success", image: "DK", color: "from-orange-500 to-orange-600" }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center bg-blue-50 rounded-full px-4 py-2 mb-6">
            <span className="text-sm font-semibold text-blue-600">ABOUT US</span>
          </div>
          <h2 className="text-4xl text-gray-500 md:text-5xl font-bold mb-6">
            We're More Than Just{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Cleaners
            </span>
          </h2>
          <p className="text-xl text-gray-600">
            We're your partners in creating healthier, happier living spaces.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Image/Visual */}
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl overflow-hidden shadow-2xl">
              <div className="aspect-w-4 aspect-h-3">
                <div className="p-8 text-white">
                  <FontAwesomeIcon icon={faQuoteRight} className="text-6xl opacity-20 mb-4" />
                  <p className="text-2xl font-light italic mb-6">
                    "Cleanliness is not just about appearance, it's about creating spaces where life can flourish."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                      SJ
                    </div>
                    <div className="ml-4">
                      <p className="font-semibold">Sarah Johnson</p>
                      <p className="text-sm opacity-90">Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors">
                  <FontAwesomeIcon icon={stat.icon} className="text-blue-600 text-2xl mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              Founded in 2010, CleanPro has grown from a small local business to a trusted name in professional cleaning services. Our journey has been driven by a simple belief: that everyone deserves a clean, healthy environment to live and work in.
            </p>

            {/* Tabs */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-2 mb-4">
                {tabs.map((tab, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeTab === idx 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
              <p className="text-gray-600 min-h-[80px]">{tabs[activeTab].content}</p>
            </div>

            {/* Features */}
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                <span className="text-sm text-gray-600">Insured & Bonded</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                <span className="text-sm text-gray-600">Background Checked</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                <span className="text-sm text-gray-600">Eco-Friendly</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h3 className="text-3xl text-gray-500 font-bold text-center mb-12">Meet Our Leadership Team</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${member.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -rotate-3`}></div>
                <div className="relative bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className={`w-24 h-24 mx-auto bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform`}>
                    {member.image}
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">{member.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">{member.role}</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                      <span className="text-xs">in</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                      <span className="text-xs">tw</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">Join Our Growing Team</h3>
          <p className="text-xl opacity-90 mb-8">We're always looking for passionate people to join our family</p>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl">
            View Careers
            <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}