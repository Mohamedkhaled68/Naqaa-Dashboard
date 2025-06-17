import useDeleteCar from "@/hooks/cars/useDeleteCar";
import { useModal } from "@/store/useModal";

const DeletionWarningModal = ({
    id,
    item,
    deleteFunc,
}: {
    id: string;
    item: string;
    deleteFunc: () => Promise<void>;
}) => {
    const { mutateAsync: deleteCar } = useDeleteCar();
    const { onClose } = useModal();

    return (
        <>
            <div className="mt-[20%] p-8 bg-white rounded-xl shadow-2xl border border-red-100 flex flex-col max-w-md mx-auto">
                {/* Warning Icon */}
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                        <svg
                            className="w-8 h-8 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Title */}
                <h1 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    Delete <span className="capitalize">{item}</span>{" "}
                    Permanently?
                </h1>

                {/* Message */}
                <p className="text-gray-600 text-center text-sm leading-relaxed mb-8">
                    This action cannot be undone. All
                    {item.toLowerCase()} information, including details, and
                    history will be permanently removed from your account.
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3">
                    <button
                        className="cursor-pointer px-6 py-2.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors duration-200 min-w-[100px]"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="cursor-pointer px-6 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 min-w-[100px] shadow-lg hover:shadow-red-200"
                        onClick={async () => {
                            await deleteFunc();
                            onClose();
                        }}
                    >
                        Delete <span className="capitalize">{item}</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default DeletionWarningModal;
