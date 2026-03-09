'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faArrowRight,
  faHeart,
  faStar,
  faShield,
  faClock,
  faLeaf,
  faRocket
} from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 right-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      {/* Newsletter Section */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Get <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">20% OFF</span> Your First Cleaning
              </h2>
              <p className="text-gray-300 text-lg">
                Subscribe to our newsletter and get exclusive deals, cleaning tips, and special offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap">
                Subscribe
                <FontAwesomeIcon icon={faArrowRight} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Clean<span className="text-white">Pro</span>
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Professional cleaning services that bring sparkle to your space. Eco-friendly products, trained staff, and 100% satisfaction guaranteed.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: faFacebook, href: '#' },
                { icon: faTwitter, href: '#' },
                { icon: faInstagram, href: '#' },
                { icon: faLinkedin, href: '#' },
                { icon: faYoutube, href: '#' }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transform hover:scale-110 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-white" />
                </a>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 bg-white/5 rounded-lg p-4">
              <FontAwesomeIcon icon={faShield} className="text-blue-400 text-2xl" />
              <div>
                <p className="font-semibold">Licensed & Insured</p>
                <p className="text-sm text-gray-400">Full liability coverage</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-blue-500 mr-3"></span>
              Quick Links
            </h4>
            <ul className="space-y-4">
              {[
                'Home',
                'About Us',
                'Services',
                'Pricing',
                'Contact',
                'FAQs'
              ].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-all" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-blue-500 mr-3"></span>
              Our Services
            </h4>
            <ul className="space-y-4">
              {[
                'Residential Cleaning',
                'Commercial Cleaning',
                'Deep Cleaning',
                'Move In/Out Cleaning',
                'Carpet Cleaning',
                'Window Cleaning'
              ].map((service, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                    <FontAwesomeIcon icon={faArrowRight} className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-all" />
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 flex items-center">
              <span className="w-8 h-0.5 bg-blue-500 mr-3"></span>
              Contact Us
            </h4>
            <div className="space-y-6">
              {[
                { icon: faLocationDot, title: 'Visit Us', info: '123 Clean Street, NY 10001', sub: 'Mon-Fri: 8AM - 8PM' },
                { icon: faPhone, title: 'Call Us', info: '+1 (555) 123-4567', sub: '24/7 Emergency Service' },
                { icon: faEnvelope, title: 'Email Us', info: 'hello@cleanpro.com', sub: 'Reply within 24hrs' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FontAwesomeIcon icon={item.icon} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{item.title}</p>
                    <p className="font-semibold">{item.info}</p>
                    <p className="text-sm text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* App Download */}
            <div className="mt-8">
              <p className="text-sm text-gray-400 mb-3">Download our app</p>
              <div className="flex gap-3">
                <button className="flex-1 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 hover:bg-black/40 transition-all duration-300">
                  <div className="text-xs">Download on</div>
                  <div className="font-semibold">App Store</div>
                </button>
                <button className="flex-1 bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 hover:bg-black/40 transition-all duration-300">
                  <div className="text-xs">Get it on</div>
                  <div className="font-semibold">Google Play</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: faStar, text: '5 Star Service', sub: '1000+ Reviews' },
              { icon: faClock, text: '24/7 Availability', sub: 'Emergency Service' },
              { icon: faLeaf, text: 'Eco-Friendly', sub: 'Green Products' },
              { icon: faRocket, text: 'Fast Response', sub: 'Within 1 Hour' }
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={feature.icon} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{feature.text}</p>
                  <p className="text-xs text-gray-400">{feature.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © 2024 CleanPro. All rights reserved. Made with <FontAwesomeIcon icon={faHeart} className="text-red-500 mx-1" /> for clean spaces
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </footer>
  );
}