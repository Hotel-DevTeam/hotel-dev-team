export interface ISalesOrders {
    usuarioId: string;
   ubicacionId: string;
   status: "confirmed";
   totalAmount: number
 }

 export interface ISalesOrderLines {
       productId: string;
        quantity: number;
        unitPrice: number;
        orderId:string;
       }