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
  assetName:string;
  brand: string;
  assetDescription: string;
  category: Category;
  type: Type;
  allStock: number;
  numberOfAvailableToAssign: number;
  numberOfMaintenance: number;
  numberOfRetired: number;
}