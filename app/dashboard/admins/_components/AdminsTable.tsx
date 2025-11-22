import { useModal } from "@/store/useModal";
import React from "react";
import AdminTableRow from "./AdminTableRow";

const AdminsTable = ({ admins }: { admins: Admin[] }) => {
    const { onOpen } = useModal((state) => state);

    if (!admins) return;
    return (
        <>
            <div className="w-full grid grid-cols-5 justify-items-center px-[42px] py-[22px] bg-[#fcfcfc]">
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Admin Name
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Email
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Role
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Permissions
                </div>
                <div className="text-[#4e4e4e] text-[14px] font-[700]">
                    Actions
                </div>
            </div>
            {admins.map((admin) => (
                <AdminTableRow key={admin._id} admin={admin} onOpen={onOpen} />
            ))}
        </>
    );
};

export default AdminsTable;
