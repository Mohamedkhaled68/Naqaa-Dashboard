import React, { useEffect, useState } from "react";
import { Car, X, Loader2, CheckCircle } from "lucide-react";
import { brands } from "@/utils/carBrands";
import useCreateCar from "@/hooks/cars/useCreateCar";

const carStatuses: { status: string; label: string; color: string }[] = [
    { status: "available", label: "Available", color: "text-green-600" },
    { status: "in_use", label: "In use", color: "text-blue-600" },
    { status: "maintenance", label: "Maintenance", color: "text-yellow-600" },
];

const carColors = [
    { value: "red", label: "Red", hex: "#EF4444" },
    { value: "black", label: "Black", hex: "#1F2937" },
    { value: "white", label: "White", hex: "#F9FAFB" },
    { value: "grey", label: "Grey", hex: "#6B7280" },
    { value: "blue", label: "Blue", hex: "#3B82F6" },
    { value: "silver", label: "Silver", hex: "#9CA3AF" },
];

const initialCarValues = {
    plateNumber: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    status: "available",
};

const CreateCarForm = ({ onClose }: { onClose: () => void }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [initialValues, setInitialValues] = useState(initialCarValues);
    const [carModels, setCarModels] = useState<string[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const { mutateAsync: createCar } = useCreateCar();

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!initialValues.plateNumber.trim()) {
            newErrors.plateNumber = "Plate number is required";
        }
        if (!initialValues.brand) {
            newErrors.brand = "Brand is required";
        }
        if (!initialValues.model) {
            newErrors.model = "Model is required";
        }
        if (!initialValues.year) {
            newErrors.year = "Year is required";
        } else if (
            Number(initialValues.year) < 1900 ||
            Number(initialValues.year) > new Date().getFullYear() + 1
        ) {
            newErrors.year = "Please enter a valid year";
        }
        if (!initialValues.color) {
            newErrors.color = "Color is required";
        }
        if (!initialValues.status) {
            newErrors.status = "Status is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInitialValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setInitialValues((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user makes selection
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            setIsLoading(true);
            await createCar({
                ...initialValues,
                year: Number(initialValues.year),
            });

            setInitialValues(initialCarValues);
            onClose();
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsLoading(false);
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const selectedBrand = brands.find(
            (brand) => brand.brand === initialValues.brand
        );
        if (selectedBrand) {
            setCarModels(selectedBrand.models);
        } else {
            setCarModels([]);
            setInitialValues((prev) => ({ ...prev, model: "" }));
        }
    }, [initialValues.brand]);

    return (
        // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="w-3xl bg-white p-5 rounded-xl ">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Car className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Add New Car
                        </h2>
                        <p className="text-sm text-gray-500">
                            Fill in the details to register a new vehicle
                        </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Form */}
            <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Plate Number */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="plateNumber"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Plate Number *
                        </label>
                        <input
                            value={initialValues.plateNumber}
                            onChange={handleInputsChange}
                            type="text"
                            id="plateNumber"
                            name="plateNumber"
                            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                errors.plateNumber
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                            placeholder="e.g., ABC-1234"
                        />
                        {errors.plateNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.plateNumber}
                            </p>
                        )}
                    </div>

                    {/* Brand */}
                    <div>
                        <label
                            htmlFor="carBrand"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Brand *
                        </label>
                        <select
                            value={initialValues.brand}
                            onChange={handleSelectChange}
                            name="brand"
                            id="carBrand"
                            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                errors.brand
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <option value="">Choose a brand</option>
                            {brands.map((brand) => (
                                <option key={brand.brand} value={brand.brand}>
                                    {brand.brand}
                                </option>
                            ))}
                        </select>
                        {errors.brand && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.brand}
                            </p>
                        )}
                    </div>

                    {/* Model */}
                    <div>
                        <label
                            htmlFor="carModel"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Model *
                        </label>
                        <select
                            value={initialValues.model}
                            onChange={handleSelectChange}
                            id="carModel"
                            name="model"
                            disabled={!initialValues.brand}
                            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed ${
                                errors.model
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <option value="">
                                {initialValues.brand
                                    ? "Choose a model"
                                    : "Select brand first"}
                            </option>
                            {carModels.map((model) => (
                                <option key={model} value={model}>
                                    {model}
                                </option>
                            ))}
                        </select>
                        {errors.model && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.model}
                            </p>
                        )}
                    </div>

                    {/* Year */}
                    <div>
                        <label
                            htmlFor="carYear"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Year of Manufacture *
                        </label>
                        <input
                            value={initialValues.year}
                            onChange={handleInputsChange}
                            type="number"
                            id="carYear"
                            name="year"
                            min="1900"
                            max={new Date().getFullYear() + 1}
                            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                errors.year
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                            placeholder="e.g., 2023"
                        />
                        {errors.year && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.year}
                            </p>
                        )}
                    </div>

                    {/* Color */}
                    <div>
                        <label
                            htmlFor="carColor"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Color *
                        </label>
                        <select
                            value={initialValues.color}
                            onChange={handleSelectChange}
                            id="carColor"
                            name="color"
                            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                                errors.color
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-gray-400"
                            }`}
                        >
                            <option value="">Select a color</option>
                            {carColors.map((color) => (
                                <option key={color.value} value={color.value}>
                                    {color.label}
                                </option>
                            ))}
                        </select>
                        {errors.color && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.color}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div className="md:col-span-2">
                        <label
                            htmlFor="carStatus"
                            className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                            Status *
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            {carStatuses.map((status) => (
                                <label
                                    key={status.status}
                                    className={`flex items-center justify-center p-3 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                                        initialValues.status === status.status
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="status"
                                        value={status.status}
                                        checked={
                                            initialValues.status ===
                                            status.status
                                        }
                                        onChange={(e) =>
                                            handleSelectChange(e as any)
                                        }
                                        className="sr-only"
                                    />
                                    <span
                                        className={`text-sm font-medium ${
                                            initialValues.status ===
                                            status.status
                                                ? "text-blue-700"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {status.label}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {errors.status && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.status}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={onClose}
                        type="button"
                        className="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit(e as any);
                        }}
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-2 min-w-[140px] justify-center"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Creating...</span>
                            </>
                        ) : (
                            <>
                                <CheckCircle className="w-4 h-4" />
                                <span>Create Car</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
        // </div>
    );
};

export default CreateCarForm;
