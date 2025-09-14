import { Role } from "./roles.enum";
export interface User {
  id: number;
  username: string;
  email: string;
  role: Role; 
  departmentName: string;
}
export interface UserRole {
  roleId: number;
  roleType: Role;
}