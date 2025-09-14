import { Type } from "./AssetTypeModel";
import { Category } from "./categoryModel";

export interface Asset {
  assetId: number;
  assetName: string;
  brand: string;
  assetDescription: string;
  category: Category;
  type: Type;
  quantity: number;
}

export interface AssetRequest {
  assetName: string;
  brand: string;
  assetDescription?: string;
  categoryId: number;
  typeId: number;
  quantity: number;
}