import { RoleType } from "./RoleTypes";
export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;       
  departmentName: string;
}
export interface Role {
  roleId: number;
  roleType: RoleType;
}