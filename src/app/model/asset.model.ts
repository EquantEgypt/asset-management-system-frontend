export interface Asset {
  id: number;
  name: string;
  description: string;
  category: string;
  type: string;
  assignedTo?: string;
  status:Status;
  serialNumber?: string;
  purchaseDate?: String;
}
export enum Status {
  AVAILABLE = "available",
  ASSIGNED = "assigned",
  MAINTENANCE = "maintenance",
  RETIRED = "retired"
}