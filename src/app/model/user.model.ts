import { Asset, Status } from "./asset.model";
import { RoleType } from "./RoleTypes";
export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;          // matches backend "role"
  departmentName: string;
  // password?: string; // only include if you need it on frontend forms
}
export interface Role {
  roleId: number;
  roleType: RoleType;
}


export const users: User[] = [
  {
    id: 1,
    username: "Department Manager",
    email: "manager@orange.com",
    role: { roleId: 1, roleType: "Department_Manager" },
    departmentName: "Operations"
  },
  {
    id: 2,
    username: "Admin User",
    email: "admin@orange.com",
    role: { roleId: 2, roleType: "Admin" },
    departmentName: "Administration"
  },
  {
    id: 3,
    username: "IT Specialist",
    email: "it@orange.com",
    role: { roleId: 3, roleType: "IT" },
    departmentName: "IT"
  },
  {
    id: 4,
    username: "Employee User",
    email: "employee@orange.com",
    role: { roleId: 4, roleType: "Employee" },
    departmentName: "General"
  }
];



// Mock Assets Data
export const assets: Asset[] = [
  {
    id: 1,
    name: "MacBook Pro 16\"",
    description: "16-inch MacBook Pro with M2 chip, 32GB RAM, 1TB SSD",
    category: "Hardware",
    type: "Laptop",
    assignedTo: "manager@orange.com",   // assigned to Department Manager
  status: Status.ASSIGNED,
    serialNumber: "MBA001-2024",
    purchaseDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Dell Monitor 27\"",
    description: "27-inch 4K monitor with USB-C connectivity",
    category: "Hardware",
    type: "Monitor",
    assignedTo: "employee@orange.com",  // assigned to Employee
  status: Status.ASSIGNED,
    serialNumber: "DM27-001",
    purchaseDate: "2024-02-10"
  },
  {
    id: 3,
    name: "iPhone 15 Pro",
    description: "iPhone 15 Pro 256GB - Space Black",
    category: "Hardware",
    type: "Phone",
    assignedTo: "it@orange.com",        // assigned to IT
  status: Status.ASSIGNED,
    serialNumber: "IPH15-001",
    purchaseDate: "2024-03-05"
  },
  {
    id: 4,
    name: "Herman Miller Chair",
    description: "Herman Miller Aeron Chair - Size B, Graphite",
    category: "Furniture",
    type: "Chair",
  status: Status.AVAILABLE,
    serialNumber: "HM-AERON-001",
    purchaseDate: "2023-12-20"
  },
  {
    id: 5,
    name: "Adobe Creative Suite",
    description: "Adobe Creative Cloud All Apps License",
    category: "Software",
    type: "License",
    assignedTo: "admin@orange.com",     // assigned to Admin
  status: Status.ASSIGNED,
    serialNumber: "ACS-2024-001"
  },
  {
    id: 6,
    name: "HP LaserJet Printer",
    description: "HP LaserJet Pro MFP - Print, Copy, Scan, Fax",
    category: "Hardware",
    type: "Printer",
  status: Status.MAINTENANCE,
    serialNumber: "HP-LJ-001",
    purchaseDate: "2023-11-15"
  },
  {
    id: 7,
    name: "Standing Desk",
    description: "Electric Height Adjustable Standing Desk 60\"x30\"",
    category: "Furniture",
    type: "Desk",
    assignedTo: "employee@orange.com",  // assigned to Employee
  status: Status.ASSIGNED,
    serialNumber: "SD-PRO-001",
    purchaseDate: "2024-01-25"
  },
  {
    id: 8,
    name: "ThinkPad X1 Carbon",
    description: "Lenovo ThinkPad X1 Carbon with Intel i7, 16GB RAM",
    category: "Hardware",
    type: "Laptop",
  status: Status.AVAILABLE,
    serialNumber: "TPX1-001",
    purchaseDate: "2024-02-28"
  },
  {
    id: 9,
    name: "Microsoft Office 365",
    description: "Microsoft Office 365 Business Premium License",
    category: "Software",
    type: "License",
    assignedTo: "manager@orange.com",   // assigned to Department Manager
  status: Status.ASSIGNED,
    serialNumber: "MSO365-001"
  },
  {
    id: 10,
    name: "iPad Pro 12.9\"",
    description: "iPad Pro 12.9-inch with M2 chip, 256GB",
    category: "Hardware",
    type: "Tablet",
  status: Status.RETIRED,
    serialNumber: "IPA-PRO-001",
    purchaseDate: "2023-08-10"
  }
];



export function getAsset(){

}
