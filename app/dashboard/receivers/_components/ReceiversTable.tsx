import React from "react";
import ReceiversTableRow from "./ReceiversTableRow";

const ReceiversTable = ({ receivers }: { receivers: Receiver[] }) => {
    if (!receivers) return null;

    return (
        <>
            <div className="w-full grid grid-cols-4 justify-items-center px-[42px] py-[22px] bg-[#fcfcfc]">
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Name
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Email
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Phone Number
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Created At
                </div>
            </div>
            {receivers.map((receiver) => (
                <ReceiversTableRow key={receiver._id} receiver={receiver} />
            ))}
        </>
    );
};

export default ReceiversTable;
