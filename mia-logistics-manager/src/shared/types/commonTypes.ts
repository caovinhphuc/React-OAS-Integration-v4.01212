// src/shared/types/commonTypes.ts
export interface Employee {
  id: string;
  email: string;
  fullName: string;
  role: string;
  department?: string;
  phone?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
}

export interface RolePermission {
  roleId: string;
  permissionId: string;
  granted: boolean;
}
