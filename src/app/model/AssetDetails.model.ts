
export interface AssetDetailsdto {
  assetId:number;
  assetName: string;
  brand: string;
  assetDescription?: string;
  categoryName: string;
  typeName: string;
  location: string;
  serialNumber: string;
  purchaseDate: string; 
  warrantyEndDate: string; 
  status: string; 
  imagePath?: string;
  assignedToId?:number;
  assignedToName?: string;
  assignedToEmail?:string;
}