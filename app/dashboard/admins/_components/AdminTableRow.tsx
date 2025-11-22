import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import DeletionWarningModal from "@/components/DeletionWarningModal";
import useDeleteAdmin from "@/hooks/admins/useDeleteAdmin";
import UpdateAdminForm from "./UpdateAdminForm";

export type AdminTableRowProps = {
    onOpen: (component: React.ReactNode) => void;
    admin: Admin;
};

const AdminTableRow = ({ admin, onOpen }: AdminTableRowProps) => {
    const { mutateAsync: deleteAdmin } = useDeleteAdmin();

    const handleUpdate = () => {
        onOpen(<UpdateAdminForm admin={admin} onClose={() => {}} />);
    };

    const handleDelete = () => {
        onOpen(
            <DeletionWarningModal
                id={admin._id}
                item="admin"
                deleteFunc={async () => {
                    await deleteAdmin({ id: admin._id });
                }}
            />
        );
    };

    return (
        <div className="w-full grid grid-cols-5 justify-items-center px-[42px] py-[22px] hover:bg-gray-50">
            <div className="text-[#000] text-[14px] font-[400]">
                {admin.name}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[400]">
                {admin.email}
            </div>
            <div className="text-[#6E6B7B] text-[14px] font-[600] capitalize">
                {admin.role}
            </div>
            <div className="text-[#6E6B7B] text-[12px] font-[400] text-center">
                {admin.permissions && admin.permissions.length > 0 ? (
                    <div className="flex flex-wrap gap-1 justify-center">
                        {admin.permissions.slice(0, 3).map((perm, idx) => (
                            <span
                                key={idx}
                                className="bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            >
                                {perm}
                            </span>
                        ))}
                        {admin.permissions.length > 3 && (
                            <span className="text-gray-500">
                                +{admin.permissions.length - 3}
                            </span>
                        )}
                    </div>
                ) : (
                    "--"
                )}
            </div>
            <div className="flex gap-2">
                <button
                    onClick={handleUpdate}
                    className="py-[8px] px-[12px] rounded-[8px] bg-blue-600 text-white outline-none cursor-pointer hover:bg-blue-700 transition duration-300 flex items-center gap-2"
                >
                    <Pencil size={16} />
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="py-[8px] px-[12px] rounded-[8px] bg-red-600 text-white outline-none cursor-pointer hover:bg-red-700 transition duration-300 flex items-center gap-2"
                >
                    <Trash2 size={16} />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AdminTableRow;
