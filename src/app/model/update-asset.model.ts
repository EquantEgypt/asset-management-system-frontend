export interface UpdateAsset {
  name: string;
  brand: string;
  assetDescription?: string;
  categoryId: number;
  typeId: number;
  location: string;
  serialNumber: string;
  purchaseDate: string; 
  warrantyEndDate: string; 
  imagePath?: string;
}