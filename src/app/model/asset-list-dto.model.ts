import { Category } from "./categoryModel";

export interface AssetListDTO{
    id:number;
    serialNumber: string;
    name:string;
    type:string;
    category:Category;
    brand:string;
    status:string;
    assignedUser:string;
    department:string;
}
