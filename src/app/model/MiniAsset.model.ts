export interface MiniAsset{
    id:number;
    serialNumber: string;
    name:string;
    type:string;
    category:AssetCategory;
    brand:string;
    status:string;
    assignedUser:string;
    department:string;
}
export interface AssetCategory{
    id:number;
    name:string;
}