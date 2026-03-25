"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusCircle,
  faInfoCircle,
  faTimes,
  faTag,
  faBriefcase,
  faAlignLeft,
  faPencilAlt,
  faDollarSign,
  faMoneyBillWave,
  faClock,
  faHourglassHalf,
  faFolder,
  faList,
  faChevronDown,
  faToggleOn,
  faBolt,
  faExclamationCircle,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";

interface AddServiceModalProps {
  show: boolean;
  onClose: () => void;
  onAddService?: (service: ServiceForm) => void;
  onEditService?: (service: ServiceForm) => void;
  editData?: ServiceForm | null;
}

export interface ServiceForm {
  id?: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  status: "active" | "inactive";
}

const categories = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "automotive", label: "Automotive" },
  { value: "maintenance", label: "Maintenance" },
  { value: "security", label: "Security" },
];

export default function AddServiceModal({
  show,
  onClose,
  onAddService,
  onEditService,
  editData = null,
}: any) {
  const isEditMode = !!editData;

  const [service, setService] = useState<ServiceForm>({
    name: "",
    description: "",
    price: "",
    duration: "",
    category: "residential",
    status: "active",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ServiceForm, string>>
  >({});

  // Auto-fill form when editData changes
  useEffect(() => {
    if (editData) {
      setService({
        id: editData._id,
        name: editData.name,
        description: editData.description,
        price: editData.price,
        duration: editData.duration,
        category: editData.category,
        status: editData.status,
      });
    } else {
      // Reset form when not in edit mode
      setService({
        name: "",
        description: "",
        price: "",
        duration: "",
        category: "residential",
        status: "active",
      });
    }
    setErrors({});
  }, [editData, show]); // Re-run when editData or show changes

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setService((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ServiceForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ServiceForm, string>> = {};

    if (!service.name.trim()) {
      newErrors.name = "Service name is required";
    }
    if (!service.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!service.price.trim()) {
      newErrors.price = "Price is required";
    } else if (!/^\d+(\.\d{1,2})?$/.test(service.price)) {
      newErrors.price = "Please enter a valid price";
    }
    if (!service.duration.trim()) {
      newErrors.duration = "Duration is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      if (isEditMode && onEditService) {
        onEditService(service);
      } else if (!isEditMode && onAddService) {
        onAddService(service);
      }
      handleClose();
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 transform transition-all">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              <FontAwesomeIcon
                icon={isEditMode ? faEdit : faPlusCircle}
                className="text-blue-500 mr-2"
              />
              {isEditMode ? "Edit Service" : "Add New Service"}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              <FontAwesomeIcon
                icon={faInfoCircle}
                className="text-gray-400 mr-1"
              />
              {isEditMode
                ? "Update the service details below"
                : "Fill in the details to create a new service"}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors group"
            aria-label="Close modal"
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="text-gray-400 group-hover:text-gray-600 text-lg"
            />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-5">
            {/* Service Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                <FontAwesomeIcon
                  icon={faTag}
                  className="text-gray-400 mr-1.5 text-xs"
                />
                Service Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={service.name}
                  onChange={handleChange}
                  placeholder="e.g., Home Cleaning, Plumbing"
                  className={`w-full pl-9 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 border ${
                    errors.name
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  } rounded-xl focus:outline-none focus:ring-2 transition-shadow`}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="mr-1"
                  />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                <FontAwesomeIcon
                  icon={faAlignLeft}
                  className="text-gray-400 mr-1.5 text-xs"
                />
                Description <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  className="absolute left-3 top-3 text-gray-400 text-sm"
                />
                <textarea
                  id="description"
                  name="description"
                  value={service.description}
                  onChange={handleChange}
                  placeholder="Describe what this service includes..."
                  rows={3}
                  className={`w-full pl-9 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 border ${
                    errors.description
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-200 focus:ring-blue-500"
                  } rounded-xl focus:outline-none focus:ring-2 transition-shadow resize-none`}
                />
              </div>
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="mr-1"
                  />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Price and Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faDollarSign}
                    className="text-gray-400 mr-1.5 text-xs"
                  />
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faMoneyBillWave}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    id="price"
                    type="text"
                    name="price"
                    value={service.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    className={`w-full pl-9 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 border ${
                      errors.price
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    } rounded-xl focus:outline-none focus:ring-2 transition-shadow`}
                  />
                </div>
                {errors.price && (
                  <p className="text-sm text-red-600 mt-1">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mr-1"
                    />
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="duration"
                  className="block text-sm font-medium text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faClock}
                    className="text-gray-400 mr-1.5 text-xs"
                  />
                  Duration <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faHourglassHalf}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <input
                    id="duration"
                    type="text"
                    name="duration"
                    value={service.duration}
                    onChange={handleChange}
                    placeholder="e.g., 2 hours"
                    className={`w-full pl-9 pr-4 py-2.5 text-gray-900 placeholder:text-gray-400 border ${
                      errors.duration
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-200 focus:ring-blue-500"
                    } rounded-xl focus:outline-none focus:ring-2 transition-shadow`}
                  />
                </div>
                {errors.duration && (
                  <p className="text-sm text-red-600 mt-1">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mr-1"
                    />
                    {errors.duration}
                  </p>
                )}
              </div>
            </div>

            {/* Category and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="text-gray-400 mr-1.5 text-xs"
                  />
                  Category
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"
                  />
                  <FontAwesomeIcon
                    icon={faList}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <select
                    id="category"
                    name="category"
                    value={service.category}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 py-2.5 text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white pl-9"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  <FontAwesomeIcon
                    icon={faToggleOn}
                    className="text-gray-400 mr-1.5 text-xs"
                  />
                  Status
                </label>
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none"
                  />
                  <FontAwesomeIcon
                    icon={faBolt}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"
                  />
                  <select
                    id="status"
                    name="status"
                    value={service.status}
                    onChange={handleChange}
                    className="w-full appearance-none px-4 py-2.5 text-gray-900 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white pl-9"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 mt-8 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <FontAwesomeIcon
                icon={isEditMode ? faSave : faPlusCircle}
                className="mr-2"
              />
              {isEditMode ? "Save Changes" : "Create Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
