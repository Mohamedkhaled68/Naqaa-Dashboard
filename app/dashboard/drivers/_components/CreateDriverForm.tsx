import React, { useState, ChangeEvent, FormEvent } from "react";
import { User, Phone, CreditCard, FileText, MapPin, Plus } from "lucide-react";
import toast from "react-hot-toast";
import useCreateDriver from "@/hooks/drivers/useCreateDriver";

type Driver = {
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address?: string; // Make optional
};

// Update the FormErrors interface
interface FormErrors {
    name?: string;
    phoneNumber?: string;
    nationalId?: string;
    licenseNumber?: string;
    address?: string;
}

const CreateDriverForm = ({ onClose }: { onClose: () => void }) => {
    const [formData, setFormData] = useState<Driver>({
        name: "",
        phoneNumber: "",
        nationalId: "",
        licenseNumber: "",
        address: "",
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const { mutateAsync: createDriver } = useCreateDriver();

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

        // Remove address validation - it's now optional
        // Only validate if address is provided and too short
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

        // Clear error when user starts typing
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
            await createDriver({ ...formData });

            toast.success("Driver created successfully!");

            onClose();
            // Reset form
            setFormData({
                name: "",
                phoneNumber: "",
                nationalId: "",
                licenseNumber: "",
                address: "",
            });
        } catch (err: any) {
            toast.error(err?.response?.data?.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    <div className="text-center mb-8">
                        <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Plus className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create New Driver
                        </h1>
                        <p className="text-gray-600">
                            Add a new driver to the system
                        </p>
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

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full cursor-pointer bg-[#222] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#111] focus:ring-2  focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                    Creating Driver...
                                </div>
                            ) : (
                                "Create Driver"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateDriverForm;
