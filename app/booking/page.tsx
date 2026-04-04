"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faEnvelope,
  faPhone,
  faCalendar,
  faComment,
  faMoneyBill,
  faCheckCircle,
  faArrowLeft,
  faHome,
  faBuilding,
  faCar,
  faWind,
  faSnowflake,
  faShield,
  faClock,
  faLocationDot,
  faMobile,
  faBox,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

// Define types
interface Package {
  id: string;
  name: string;
  price: string;
  icon: IconDefinition;
  description: string;
}

interface ServiceDetails {
  id: string;
  name: string;
  price: string;
  icon: IconDefinition | null;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone: string;
  streetAddress: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  serviceDate: string;
  serviceTime: string;
  serviceDuration: string;
  numberOfRooms: string;
  squareFootage: string;
  specialRequests: string;
  hasPets: boolean;
  petDetails: string;
  accessInstructions: string;
  paymentMethod: string;
  agreeToTerms: boolean;
}

// Define packages data with proper typing

export default function BookingPage() {
  const router = useRouter();

  function useSafeSearchParams() {
    if (typeof window === "undefined") return null; // SSR ke waqt null return kare
    return useSearchParams();
  }
  const searchParams = useSafeSearchParams();
  const [formStep, setFormStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [packages, setPackagesData] = useState<any>([]);
  const [bookingComplete, setBookingComplete] = useState<boolean>(false);
  const [showPackageDropdown, setShowPackageDropdown] =
    useState<boolean>(false);

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

  // Get service details from URL params
  const [serviceDetails, setServiceDetails] = useState<ServiceDetails>({
    id: "",
    name: "",
    price: "",
    icon: null,
  });

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    alternatePhone: "",

    // Address Details
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",

    // Service Details
    serviceDate: "",
    serviceTime: "",
    serviceDuration: "2-3 hours",
    numberOfRooms: "",
    squareFootage: "",
    specialRequests: "",

    // Additional Preferences
    hasPets: false,
    petDetails: "",
    accessInstructions: "",

    // Payment
    paymentMethod: "cash",
    agreeToTerms: false,
  });
  useEffect(() => {
    if (!searchParams) return;
    const id = searchParams.get("_id");
    const name = searchParams.get("name");
    const price = searchParams.get("price");
    if (id && name && price) {
      setServiceDetails({
        id,
        name: decodeURIComponent(name),
        price: decodeURIComponent(price),
        icon: getServiceIcon(id),
      });
      setShowPackageDropdown(false);
    } else {
      setShowPackageDropdown(true);

      if (packages.length > 0) {
        setServiceDetails({
          id: packages[0]._id,
          name: packages[0].name,
          price: packages[0].price,
          icon: getServiceIcon(packages[0]._id),
        });
      }
    }
  }, [searchParams, packages]);

  // Get appropriate icon based on service ID
  const getServiceIcon = (id: string): IconDefinition => {
    const icons: { [key: string]: IconDefinition } = {
      "1": faHome,
      "2": faBuilding,
      "3": faCar,
      "4": faWind,
      "5": faSnowflake,
      "6": faShield,
    };
    return icons[id] || faHome;
  };

  // Handle package selection
  const handlePackageSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selectedPackage = packages.find((p: any) => p._id === selectedId);

    if (selectedPackage) {
      setServiceDetails({
        id: selectedPackage._id,
        name: selectedPackage.name,
        price: selectedPackage.price,
        icon: getServiceIcon(selectedPackage._id),
      });
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 2:
        return !!(
          formData.streetAddress &&
          formData.city &&
          formData.state &&
          formData.zipCode
        );
      case 3:
        return !!(formData.serviceDate && formData.serviceTime);
      case 4:
        return formData.agreeToTerms;
      default:
        return true;
    }
  };

  // Handle next step
  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(formStep + 1);
      window.scrollTo(0, 0);
    } else {
      toast.info("Please fill in all required fields");
    }
  };

  // Handle previous step
  const handlePrevStep = () => {
    setFormStep(formStep - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service: serviceDetails,
          ...formData,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        setIsSubmitting(false);
        return;
      }

      toast.success("Booking completed successfully 🎉");

      setBookingComplete(true);
    } catch (error) {
      toast.error("Something went wrong");
    }

    setIsSubmitting(false);
  };
  // If no service selected and no packages to show
  if (!serviceDetails.name && !bookingComplete && packages.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Packages Available
          </h2>
          <p className="text-gray-600 mb-6">
            Please check back later for available services.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // Booking completion screen
  if (bookingComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-600 text-4xl"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Booking Confirmed!
          </h2>
          <p className="text-gray-600 mb-4">
            Thank you for booking {serviceDetails.name}. We'll contact you
            shortly to confirm your appointment.
          </p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-700 mb-2">
              Booking Summary:
            </h3>
            <p className="text-sm text-gray-600">
              Service: {serviceDetails.name}
            </p>
            <p className="text-sm text-gray-600">
              Date: {formData.serviceDate}
            </p>
            <p className="text-sm text-gray-600">
              Time: {formData.serviceTime}
            </p>
            <p className="text-sm text-gray-600">Payment: Cash on service</p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all w-full"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => router.back()}
            className="mr-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Complete Your Booking
            </h1>
            <p className="text-gray-600 mt-1">
              Please fill in all the details below
            </p>
          </div>
        </div>

        {/* Package Selection Dropdown - Show when no data from URL */}
        {showPackageDropdown && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <FontAwesomeIcon icon={faBox} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Select a Service Package
              </h3>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose from available packages
              </label>
              <div className="relative w-full">
                <select
                  value={serviceDetails.id || ""}
                  onChange={handlePackageSelect}
                  className="w-full text-gray-500 px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                >
                  {packages.map((pkg: any) => (
                    <option
                      className="text-gray-600"
                      key={pkg._id}
                      value={pkg._id}
                    >
                      {pkg.name} - {pkg.price} $
                    </option>
                  ))}
                </select>

                {/* Custom Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                  ▼
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {
                  packages.find((p: any) => p._id === serviceDetails.id)
                    ?.description
                }
              </p>
            </div>
          </div>
        )}

        {/* Service Summary Card */}
        {serviceDetails.name && serviceDetails.icon && (
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-xl p-6 mb-8 text-white">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                  <FontAwesomeIcon
                    icon={serviceDetails.icon}
                    className="text-2xl"
                  />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Selected Service</p>
                  <h2 className="text-xl font-bold">{serviceDetails.name}</h2>
                </div>
              </div>
              <div className="bg-white/20 px-6 py-3 rounded-xl">
                <p className="text-sm text-blue-100">Total Price</p>
                <p className="text-2xl font-bold">{serviceDetails.price}$</p>
              </div>
            </div>
          </div>
        )}

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            {["Personal Info", "Address", "Service Details", "Payment"].map(
              (step, index) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      formStep > index + 1
                        ? "bg-green-500 text-white"
                        : formStep === index + 1
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {formStep > index + 1 ? "✓" : index + 1}
                  </div>
                  {index < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        formStep > index + 1 ? "bg-green-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ),
            )}
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-blue-600 font-medium">
              {stepTitles[formStep - 1]}
            </span>
            <span className="text-gray-500">Step {formStep} of 4</span>
          </div>
        </div>

        {/* Booking Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
        >
          {/* Step 1: Personal Information */}
          {formStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 text-blue-600"
                    />
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border text-gray-500 placeholder:text-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="John"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon
                      icon={faUser}
                      className="mr-2 text-blue-600"
                    />
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 text-gray-500 placeholder:text-gray-500 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="mr-2 text-blue-600"
                    />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border text-gray-500 placeholder:text-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon
                      icon={faPhone}
                      className="mr-2 text-blue-600"
                    />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border text-gray-500 placeholder:text-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon
                      icon={faMobile}
                      className="mr-2 text-blue-600"
                    />
                    Alternate Phone
                  </label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border text-gray-500 placeholder:text-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="(555) 987-6543"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Address Details */}
          {formStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Service Address
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="mr-2 text-blue-600"
                    />
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border text-gray-500 placeholder:text-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="123 Main Street"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apartment/Suite (Optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border text-gray-500 placeholder:text-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Apt 4B"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 text-gray-500 placeholder:text-gray-500 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Los Angeles"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State *
                    </label>
                    <div className="relative w-full">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 pr-10 text-gray-500 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                        required
                      >
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                        <option value="IL">Illinois</option>
                      </select>

                      {/* Custom Arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                        ▾
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full text-gray-500 placeholder:text-gray-500 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="90210"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Service Details */}
          {formStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Service Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className="mr-2 text-blue-600"
                    />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    name="serviceDate"
                    value={formData.serviceDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full text-gray-500 placeholder:text-gray-500 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <FontAwesomeIcon
                      icon={faClock}
                      className="mr-2 text-blue-600"
                    />
                    Preferred Time *
                  </label>
                  <div className="relative w-full">
                    <select
                      name="serviceTime"
                      value={formData.serviceTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 pr-10 text-gray-500 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="8:00 AM - 11:00 AM">
                        8:00 AM - 11:00 AM
                      </option>
                      <option value="11:00 AM - 2:00 PM">
                        11:00 AM - 2:00 PM
                      </option>
                      <option value="2:00 PM - 5:00 PM">
                        2:00 PM - 5:00 PM
                      </option>
                      <option value="5:00 PM - 8:00 PM">
                        5:00 PM - 8:00 PM
                      </option>
                    </select>

                    {/* Arrow */}
                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                      ▾
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Rooms
                  </label>
                  <input
                    type="number"
                    name="numberOfRooms"
                    value={formData.numberOfRooms}
                    onChange={handleInputChange}
                    className="w-full px-4 text-gray-500 placeholder:text-gray-500 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Square Footage
                  </label>
                  <input
                    type="text"
                    name="squareFootage"
                    value={formData.squareFootage}
                    onChange={handleInputChange}
                    className="w-full text-gray-500 placeholder:text-gray-500 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 1500 sq ft"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <FontAwesomeIcon
                    icon={faComment}
                    className="mr-2 text-blue-600"
                  />
                  Special Requests
                </label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full text-gray-500 placeholder:text-gray-500 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any specific requirements or instructions..."
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="hasPets"
                    checked={formData.hasPets}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I have pets at home
                  </label>
                </div>

                {formData.hasPets && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pet Details
                    </label>
                    <input
                      type="text"
                      name="petDetails"
                      value={formData.petDetails}
                      onChange={handleInputChange}
                      className="w-full text-gray-500 placeholder:text-gray-500 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Type and number of pets"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Access Instructions
                  </label>
                  <input
                    type="text"
                    name="accessInstructions"
                    value={formData.accessInstructions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border text-gray-500 placeholder:text-gray-500 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Gate codes, parking instructions, etc."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Payment */}
          {formStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Method
              </h3>

              {/* Booking Summary */}
              <div className="bg-gray-50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Booking Summary
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-gray-900">
                      {serviceDetails.name}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-medium text-gray-900">
                      {serviceDetails.price}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">
                      {formData.serviceDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium text-gray-900">
                      {formData.serviceTime}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Address:</span>
                    <span className="font-medium text-gray-900 text-right">
                      {formData.streetAddress}, {formData.city},{" "}
                      {formData.state} {formData.zipCode}
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Payment Method
                </label>

                <div className="border-2 border-blue-500 rounded-xl bg-blue-50 p-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div className="ml-3 flex items-center">
                      <FontAwesomeIcon
                        icon={faMoneyBill}
                        className="text-green-600 mr-2"
                      />
                      <div>
                        <span className="font-medium text-gray-900">
                          Cash Payment
                        </span>
                        <p className="text-sm text-gray-500">
                          Pay with cash upon service completion
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  * Payment is collected after the service is completed to your
                  satisfaction
                </p>
              </div>

              {/* Terms Agreement */}
              <div className="mt-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    I agree to the terms and conditions and confirm that I will
                    pay with cash upon service completion *
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            {formStep > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Previous Step
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            )}

            {formStep < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                  formData.agreeToTerms
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Processing..." : "Confirm & Book"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const stepTitles = [
  "Personal Information",
  "Service Address",
  "Service Details",
  "Payment",
];
