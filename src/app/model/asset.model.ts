import { Type } from "./AssetTypeModel";
import { Category } from "./categoryModel";

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

export interface AssetRequest {
  assetName: string;
  brand: string;
  assetDescription?: string;
  categoryId: number;
  typeId: number;
  allStock: number;
  numberOfAvailableToAssign: number;
  numberOfMaintenance: number;
  numberOfRetired: number;
}