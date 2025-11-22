"use client";
import GridContainer from "@/components/GridContainer";
import OptionsBar from "@/components/OptionsBar";
import React, { useState } from "react";
import ReceiversTable from "./_components/ReceiversTable";
import { ClipLoader } from "react-spinners";
import { useModal } from "@/store/useModal";
import useGetAllReceivers from "@/hooks/receivers/useGetAllReceivers";
import CreateReceiverForm from "./_components/CreateReceiverForm";

const Receivers = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { data: receivers, isLoading } = useGetAllReceivers();
    const { onOpen, onClose } = useModal();

    // Filter receivers based on search term
    const filteredReceivers = receivers?.filter(
        (receiver: Receiver) =>
            receiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receiver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            receiver.phoneNumber.includes(searchTerm)
    );

    return (
        <GridContainer className="flex flex-col pb-[10px]">
            <OptionsBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                pageOption={
                    <button
                        onClick={() => {
                            onOpen(<CreateReceiverForm onClose={onClose} />);
                        }}
                        className="cursor-pointer py-2 px-[38px] rounded-[5px] bg-[#222] text-[12px] font-normal text-[#fff] outline-none"
                    >
                        Add Receiver
                    </button>
                }
            />
            {isLoading || !receivers ? (
                <div className="text-xl font-bold flex justify-center items-center text-center p-6">
                    <ClipLoader size={50} />
                </div>
            ) : filteredReceivers && filteredReceivers.length > 0 ? (
                <ReceiversTable receivers={filteredReceivers} />
            ) : (
                <>
                    <div className="text text-center text-gray-500 text-sm py-5">
                        No receivers available at the moment.
                    </div>
                </>
            )}
        </GridContainer>
    );
};

export default Receivers;
