import { fileHandle } from "./fileHandle.model";

export interface Product{
    productId:number;
    productName:string,
    productDescription:string,
    productActualPrice:number,
    productDiscountedPrice:number,
    productImages:fileHandle[]
}