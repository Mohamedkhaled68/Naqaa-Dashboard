import React from "react";

export type ReceiverTableRowProps = {
    receiver: Receiver;
};

const ReceiversTableRow = ({ receiver }: ReceiverTableRowProps) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="w-full grid grid-cols-4 justify-items-center px-[42px] py-[22px] border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="text-[#000] text-[14px] font-[400]">
                {receiver.name}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {receiver.email}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {receiver.phoneNumber}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {formatDate(receiver.createdAt)}
            </div>
        </div>
    );
};

export default ReceiversTableRow;
