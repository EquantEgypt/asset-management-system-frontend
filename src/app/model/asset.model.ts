export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface Type {
  typeId: number;
  typeName: string;
}

export interface Asset {
  id: number;
  name: string;
  category: string;
  type: string;
  assignedTo: string;
  status: string;
  purchaseDate: string;
} 

export enum Status {
  AVAILABLE = "available",
  ASSIGNED = "assigned",
  MAINTENANCE = "maintenance",
  RETIRED = "retired"
}