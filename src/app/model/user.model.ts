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
// src/app/mock-data/mock-assets.ts

export const assets: Asset[] = [
  {
    id: 1,
    name: "Dell XPS 15",
    description: "High-performance laptop for development work",
    category: "Laptop",
    type: "Electronics",
    assignedTo: "employee@orange.com",
    status: Status.ASSIGNED,
    serialNumber: "DXPS-2023-001",
    purchaseDate: "2023-01-15",
  },
  {
    id: 2,
    name: "iPhone 13",
    description: "Company phone for communication",
    category: "Mobile",
    type: "Electronics",
    assignedTo: "manager@orange.com",
    status: Status.ASSIGNED,
    serialNumber: "IPH13-2022-045",
    purchaseDate: "2022-09-20",
  },
  {
    id: 3,
    name: "Office Chair",
    description: "Ergonomic chair for comfort",
    category: "Furniture",
    type: "Office Equipment",
    status: Status.AVAILABLE,
    serialNumber: "CHAIR-2021-078",
    purchaseDate: "2021-11-05",
  },
  {
    id: 4,
    name: "LG Monitor 27''",
    description: "27-inch 4K monitor",
    category: "Monitor",
    type: "Electronics",
    assignedTo: "it@orange.com",
    status: Status.ASSIGNED,
    serialNumber: "LG-27UL850-2022-012",
    purchaseDate: "2022-06-10",
  },
  {
    id: 5,
    name: "HP LaserJet Printer",
    description: "Shared office printer",
    category: "Printer",
    type: "Electronics",
    status: Status.MAINTENANCE,
    serialNumber: "HPLJ-2020-099",
    purchaseDate: "2020-03-22",
  },
  {
    id: 6,
    name: "Old Lenovo ThinkPad",
    description: "Retired laptop",
    category: "Laptop",
    type: "Electronics",
    status: Status.RETIRED,
    serialNumber: "LTP-2018-345",
    purchaseDate: "2018-05-18",
  },
];
