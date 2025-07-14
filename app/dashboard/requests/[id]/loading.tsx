import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                <ClipLoader size={50} color="#4F46E5" />
                <h2 className="text-xl font-semibold text-gray-900 mt-4">
                    Loading Request Details...
                </h2>
                <p className="text-gray-600 mt-2">
                    Please wait while we fetch the request information.
                </p>
            </div>
        </div>
    );
};

export default Loading;
