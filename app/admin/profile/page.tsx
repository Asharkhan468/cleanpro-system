"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCalendar,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

interface UserProfile {
  name: string;
  email: string;
  role?: string;
  joinDate?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/profile');
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-2 text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-2 py-4">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Cover Image */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24 sm:h-32"></div>
        
        {/* Avatar Section */}
        <div className="px-4 sm:px-6 relative">
          <div className="flex items-end -mt-10 sm:-mt-12 mb-4 sm:mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
                {profile?.name?.charAt(0) || 'A'}
              </div>
            </div>
            <div className="ml-3 sm:ml-4 pb-1 sm:pb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{profile?.name || 'Admin User'}</h2>
              {profile?.role && (
                <div className="flex items-center gap-1 mt-1">
                  <FontAwesomeIcon icon={faShieldAlt} className="w-3 h-3 text-blue-500" />
                  <p className="text-xs sm:text-sm text-blue-600">{profile.role}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Information Section */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Account Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {/* Name Field */}
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
              <FontAwesomeIcon icon={faUser} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Full Name</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 mt-1">
                  {profile?.name || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Email Field */}
            <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl">
              <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Email Address</p>
                <p className="text-sm sm:text-base font-medium text-gray-900 mt-1 break-all">
                  {profile?.email || 'Not provided'}
                </p>
              </div>
            </div>

            {/* Optional: Member Since */}
            {profile?.joinDate && (
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl sm:col-span-2">
                <FontAwesomeIcon icon={faCalendar} className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Member Since</p>
                  <p className="text-sm sm:text-base font-medium text-gray-900 mt-1">
                    {profile.joinDate}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Info Note */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs sm:text-sm text-blue-700">
              <span className="font-medium">Note:</span> This is an admin account. Contact system administrator for any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}