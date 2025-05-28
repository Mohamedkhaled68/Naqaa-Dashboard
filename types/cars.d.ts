type MaintenanceRecord = {
    _id: string;
    car: string;
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
};

type Car = {
    _id: string;
    plateNumber: string;
    brand: string;
    model: string;
    driver: {
        _id: string;
        name: string;
        phoneNumber: string;
        nationalId: string;
        licenseNumber: string;
        address: string;
    }[];
    maintenanceHistory: MaintenanceRecord[];
    year: number;
    color: string;
    status: string;
    meterReading: number;
    lastMeterUpdate: string;
    createdAt: string;
    updatedAt: string;
};
