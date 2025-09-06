import { RoleType } from "./RoleTypes";

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: RoleType[];
}