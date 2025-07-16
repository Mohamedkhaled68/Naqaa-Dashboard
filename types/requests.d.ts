export interface Request {
    _id: string;
    driver: {
        _id: string;
        name: string;
        phoneNumber: string;
    };
    car: {
        _id: string;
        plateNumber: string;
        brand: string;
        model: string;
    };
    subCategories: Array<{
        _id: string;
        name: string;
        description: string;
    }>;
    description: string;
    customFieldData: Array<{
        fieldName: string;
        fieldValue: string;
        subcategoryId: string;
        _id: string;
    }>;
    status: "open" | "accepted" | "rejected" | "underReview" | "completed";
    receiptImage: string;
    cost: number;
    mechanicCost: number;
    createdAt: string;
}

export interface RequestFormData {
    driverId: string;
    requestType: string;
    description: string;
    priority: "low" | "medium" | "high";
    additionalNotes?: string;
}
