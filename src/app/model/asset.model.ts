import { category } from "./category.model";

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
  category: String;
  type: String;
  brand : string;
  assignedTo: string;
  status: string;
  Department: string;
} 

export enum Status {
  GOOD = "GOOD",
  MAINTENANCE = "UNDER_MAINTENANCE",
  RETIRED = "RETIRED"
}
