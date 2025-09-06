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