import React, { useState, ChangeEvent, FormEvent } from "react";
import {
    User,
    Phone,
    CreditCard,
    FileText,
    MapPin,
    Save,
    X,
} from "lucide-react";
import useUpdateDriver from "@/hooks/drivers/useUpdateDriver";
import toast from "react-hot-toast";
import { useCurrentDriverStore } from "@/store/drivers/useCurrentDriverStore";

type Driver = {
    _id: string;
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address?: string;
};

interface FormErrors {
    name?: string;
    phoneNumber?: string;
    nationalId?: string;
    licenseNumber?: string;
    address?: string;
}

interface UpdateDriverFormProps {
    driver: Driver;
    onClose: () => void;
}

const UpdateDriverForm: React.FC<UpdateDriverFormProps> = ({
    driver,
    onClose,
}) => {
    const [formData, setFormData] = useState({
        name: driver.name,
        phoneNumber: driver.phoneNumber,
        nationalId: driver.nationalId,
        licenseNumber: driver.licenseNumber,
        address: driver.address || "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { mutateAsync: updateDriver } = useUpdateDriver(driver._id);
    const { setDriver, driver: driverState } = useCurrentDriverStore(
        (state) => state
    );

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = "Please enter a valid phone number";
        }

        if (!formData.nationalId.trim()) {
            newErrors.nationalId = "National ID is required";
        } else if (formData.nationalId.trim().length < 8) {
            newErrors.nationalId = "National ID must be at least 8 characters";
        }

        if (!formData.licenseNumber.trim()) {
            newErrors.licenseNumber = "License number is required";
        } else if (formData.licenseNumber.trim().length < 5) {
            newErrors.licenseNumber =
                "License number must be at least 5 characters";
        }

        if (
            formData.address &&
            formData.address.trim().length > 0 &&
            formData.address.trim().length < 10
        ) {
            newErrors.address = "Please provide a complete address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof FormErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await updateDriver(formData);
            onClose();
        } catch (err: any) {
            toast.error(
                err?.response?.data?.message ||
                    "Failed to update driver. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="text-center flex-1">
                        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Update Driver
                        </h1>
                        <p className="text-gray-600">Edit driver information</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Full Name
                        </label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter driver's full name"
                            />
                        </div>
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Phone Number Field */}
                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Phone Number
                        </label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                    errors.phoneNumber
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter phone number"
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.phoneNumber}
                            </p>
                        )}
                    </div>

                    {/* National ID Field */}
                    <div>
                        <label
                            htmlFor="nationalId"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            National ID
                        </label>
                        <div className="relative">
                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                id="nationalId"
                                name="nationalId"
                                value={formData.nationalId}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                    errors.nationalId
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter national ID number"
                            />
                        </div>
                        {errors.nationalId && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.nationalId}
                            </p>
                        )}
                    </div>

                    {/* License Number Field */}
                    <div>
                        <label
                            htmlFor="licenseNumber"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            License Number
                        </label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                id="licenseNumber"
                                name="licenseNumber"
                                value={formData.licenseNumber}
                                onChange={handleInputChange}
                                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                    errors.licenseNumber
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter driver's license number"
                            />
                        </div>
                        {errors.licenseNumber && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.licenseNumber}
                            </p>
                        )}
                    </div>

                    {/* Address Field */}
                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Address{" "}
                            <span className="text-gray-400 font-normal">
                                (Optional)
                            </span>
                        </label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-4 text-gray-400 w-5 h-5" />
                            <textarea
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                rows={3}
                                className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none ${
                                    errors.address
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                                placeholder="Enter complete address (optional)"
                            />
                        </div>
                        {errors.address && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.address}
                            </p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 cursor-pointer bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Updating...
                                </div>
                            ) : (
                                <div className="flex items-center">
                                    <Save className="w-5 h-5 mr-2" />
                                    Update Driver
                                </div>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDriverForm;
