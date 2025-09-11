export interface Category {
  categoryId: number;
  categoryName: string;
}

export interface Type {
  typeId: number;
  typeName: string;
}

export interface Asset {
  assetId: number;
  assetName: string;
  brand: string;
  assetDescription: string;
  category: Category;   // بقى object مش string
  type: Type;           // بقى object مش string
  allStock: number;
  numberOfAvailableToAssign: number;
  numberOfMaintenance: number;
  numberOfRetired: number;
}

export enum Status {
  AVAILABLE = "available",
  ASSIGNED = "assigned",
  MAINTENANCE = "maintenance",
  RETIRED = "retired"
}