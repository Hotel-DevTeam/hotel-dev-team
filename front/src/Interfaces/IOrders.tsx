import { IProduct } from "./IUser";

export interface ISalesOrders {
    usuarioId: string;
   ubicacionId: string;
   status: string;
   totalAmount: number
 }

 export interface ISalesOrderLines {
  id?:string;
  productId: string;
  quantity: number;
  unitPrice: number;
  orderId:string;
       }

       export interface IOrderItem {
        product: IProduct;
        quantity: number;
        price:number;
        totalAmount:number;   
        roomId:string;
      }