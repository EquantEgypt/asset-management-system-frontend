export interface Asset {
  id: number;
  name: string;
  description: string;
  category: string;
  type: string;
  assignedTo?: string;
  status:status;
  serialNumber?: string;
  purchaseDate?: String;
}
export enum status{
  'available' ,
  'assigned'  ,
  'maintenance' ,
  'retired'
}