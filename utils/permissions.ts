import { useAdminStore } from "@/store/admin/useAdminStore";

export type UserRole = "admin" | "accountant";

export interface Permissions {
    // Category permissions
    canAddCategory: boolean;
    canEditCategory: boolean;
    canDeleteCategory: boolean;

    // Subcategory permissions
    canAddSubcategory: boolean;
    canEditSubcategory: boolean;
    canDeleteSubcategory: boolean;
    canAddSubcategoryFields: boolean;
    canEditSubcategoryFields: boolean;
    canDeleteSubcategoryFields: boolean;

    // Driver permissions
    canAddDriver: boolean;
    canEditDriver: boolean;
    canDeleteDriver: boolean;
    canViewDriver: boolean;

    // Car permissions
    canAddCar: boolean;
    canEditCar: boolean;
    canDeleteCar: boolean;
    canViewCar: boolean;

    // Maintenance permissions
    canAddMaintenance: boolean;
    canEditMaintenance: boolean;
    canDeleteMaintenance: boolean;
    canViewMaintenance: boolean;

    // Request permissions
    canViewRequests: boolean;
    canCompleteRequests: boolean;
}

const ROLE_PERMISSIONS: Record<UserRole, Permissions> = {
    admin: {
        // Category permissions
        canAddCategory: true,
        canEditCategory: true,
        canDeleteCategory: true,

        // Subcategory permissions
        canAddSubcategory: true,
        canEditSubcategory: true,
        canDeleteSubcategory: true,
        canAddSubcategoryFields: true,
        canEditSubcategoryFields: true,
        canDeleteSubcategoryFields: true,

        // Driver permissions
        canAddDriver: true,
        canEditDriver: true,
        canDeleteDriver: true,
        canViewDriver: true,

        // Car permissions
        canAddCar: true,
        canEditCar: true,
        canDeleteCar: true,
        canViewCar: true,

        // Maintenance permissions
        canAddMaintenance: true,
        canEditMaintenance: true,
        canDeleteMaintenance: true,
        canViewMaintenance: true,

        // Request permissions
        canViewRequests: true,
        canCompleteRequests: true,
    },
    accountant: {
        // Category permissions
        canAddCategory: false,
        canEditCategory: true,
        canDeleteCategory: false,

        // Subcategory permissions
        canAddSubcategory: true,
        canEditSubcategory: true,
        canDeleteSubcategory: true,
        canAddSubcategoryFields: true,
        canEditSubcategoryFields: true,
        canDeleteSubcategoryFields: true,

        // Driver permissions
        canAddDriver: false,
        canEditDriver: true,
        canDeleteDriver: false,
        canViewDriver: true,

        // Car permissions
        canAddCar: false,
        canEditCar: true,
        canDeleteCar: false,
        canViewCar: true,

        // Maintenance permissions
        canAddMaintenance: true,
        canEditMaintenance: true,
        canDeleteMaintenance: true,
        canViewMaintenance: true,

        // Request permissions
        canViewRequests: true,
        canCompleteRequests: true,
    },
};

export const usePermissions = (): Permissions => {
    const { admin } = useAdminStore();
    const role = admin?.role as UserRole;

    if (!role || !ROLE_PERMISSIONS[role]) {
        // Default to most restrictive permissions if role is not found
        return ROLE_PERMISSIONS.accountant;
    }

    return ROLE_PERMISSIONS[role];
};

export const hasPermission = (permission: keyof Permissions): boolean => {
    const permissions = usePermissions();
    return permissions[permission];
};

// Helper hooks for specific permission checks
export const useCanAddCategory = () => hasPermission("canAddCategory");
export const useCanEditCategory = () => hasPermission("canEditCategory");
export const useCanDeleteCategory = () => hasPermission("canDeleteCategory");

export const useCanAddSubcategory = () => hasPermission("canAddSubcategory");
export const useCanEditSubcategory = () => hasPermission("canEditSubcategory");
export const useCanDeleteSubcategory = () =>
    hasPermission("canDeleteSubcategory");
export const useCanAddSubcategoryFields = () =>
    hasPermission("canAddSubcategoryFields");
export const useCanEditSubcategoryFields = () =>
    hasPermission("canEditSubcategoryFields");
export const useCanDeleteSubcategoryFields = () =>
    hasPermission("canDeleteSubcategoryFields");

export const useCanAddDriver = () => hasPermission("canAddDriver");
export const useCanEditDriver = () => hasPermission("canEditDriver");
export const useCanDeleteDriver = () => hasPermission("canDeleteDriver");
export const useCanViewDriver = () => hasPermission("canViewDriver");

export const useCanAddCar = () => hasPermission("canAddCar");
export const useCanEditCar = () => hasPermission("canEditCar");
export const useCanDeleteCar = () => hasPermission("canDeleteCar");
export const useCanViewCar = () => hasPermission("canViewCar");

export const useCanAddMaintenance = () => hasPermission("canAddMaintenance");
export const useCanEditMaintenance = () => hasPermission("canEditMaintenance");
export const useCanDeleteMaintenance = () =>
    hasPermission("canDeleteMaintenance");
export const useCanViewMaintenance = () => hasPermission("canViewMaintenance");

export const useCanViewRequests = () => hasPermission("canViewRequests");
export const useCanCompleteRequests = () =>
    hasPermission("canCompleteRequests");
