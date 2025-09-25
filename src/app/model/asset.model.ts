import { Type } from "./AssetTypeModel";
import { Category } from "./categoryModel";

export interface Asset {
  assetId: number;
  assetName: string;
  brand: string;
  assetDescription: string;
  category: Category;
  type: Type;
  purchaseDate: string;
  warrantyEndDate: string;
  serialNumber: string;
}

export interface AssetRequest {
  name: string;
  brand: string;
  assetDescription?: string;
  categoryId: number;
  typeId: number;
  location: string;
  serialNumber: string;
  purchaseDate: string; 
  warrantyEndDate: string; 
  status: string; 
  imagePath?: string;
}