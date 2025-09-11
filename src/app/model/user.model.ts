import { Asset, Status } from "./asset.model";
import { Role } from "./roles.enum";

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;       
  departmentName: string;
}

export interface UserRole {
  roleId: number;
  roleType: Role;
}

export const users: User[] = [
  {
    id: 1,
    username: "Manager",
    email: "manager@orange.com",
    role: { roleId: 1, roleType: Role.MANAGER },
    departmentName: "IT",
  },
  {
    id: 2,
    username: "Admin",
    email: "admin@orange.com",
    role: { roleId: 2, roleType: Role.ADMIN },
    departmentName: "Operations",
  },
  {
    id: 3,
    username: "IT Specialist",
    email: "it@orange.com",
    role: { roleId: 3, roleType: Role.IT },
    departmentName: "IT",
  },
  {
    id: 4,
    username: "Employee",
    email: "employee@orange.com",
    role: { roleId: 4, roleType: Role.EMPLOYEE },
    departmentName: "Finance",
  },
];

