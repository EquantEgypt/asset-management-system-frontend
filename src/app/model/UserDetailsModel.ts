export interface UserDetailsModel {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  departmentId: number;
  departmentName: string;
  hireDate: Date;
  isActive: boolean;
}
