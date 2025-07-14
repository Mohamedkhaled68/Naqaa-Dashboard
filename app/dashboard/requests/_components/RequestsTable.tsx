import React from "react";
import { Request } from "@/types/requests";
import RequestTableRow from "./RequestTableRow";

type RequestsTableProps = {
    requests: Request[];
};

const RequestsTable: React.FC<RequestsTableProps> = ({ requests }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Request ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Driver
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Car
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Created Date
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {requests.map((request) => (
                        <RequestTableRow key={request._id} request={request} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RequestsTable;
