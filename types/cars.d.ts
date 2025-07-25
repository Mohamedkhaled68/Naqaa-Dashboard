type Driver = {
    _id: string;
    name: string;
    phoneNumber: string;
    nationalId: string;
    licenseNumber: string;
    address?: string;
    car: Car | null; // Can be a Car object or a string ID
};

type MeterReading = {
    reading: number;
    date: string; // ISO string
    _id?: string; // Optional ID field
};

type MaintenanceRecord = {
    _id: string;
    car: string;
    mechanicCost: number;
    driver: {
        _id: string;
        name: string;
        phoneNumber: string;
        nationalId: string;
        licenseNumber: string;
        address: string;
    };
    subCategories: {
        _id: string;
        name: string;
        category: {
            _id: string;
            name: string;
        };
        description: string;
        createdAt: string;
        updatedAt: string;
    }[];
    description: string;
    cost: number;
    date: string;
    customFieldValues?: {
        fieldName: string;
        fieldValue: string;
        subcategoryId: string;
    }[];
};

type Car = {
    _id: string;
    plateNumber: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: "in_use" | "available" | "maintenance" | string; // extend as needed
    driver: Driver[];
    maintenanceHistory: MaintenanceRecord[];
    meterReading: number;
    lastOCRCheck: number;
    oilChangeReminderKM: number;
    oilChangeKM: number; // derived field
    oilMustChange: boolean;
    oilChangeReminderPoint: number; // derived field
    oilChangeInterval: number; // derived field
    examinationDate?: string; // ISO date string - optional
    insuranceDate?: string; // ISO date string - optional
    lastMeterUpdate: string; // ISO date string
    meterReadingsHistory: MeterReading[];
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
};
