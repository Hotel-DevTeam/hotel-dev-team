export interface ICreateMovement {
  usuario: {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    isAdmin: boolean;
  };
  monto: number;
  descripcion: string;
  estado: string; 
  producto: {
    id: string;
  };
  ubicacion: {
    id: string;
    nombre?:string;
    };
  tipoMovimiento: TipoMovimiento; 
}

export enum TipoMovimiento {
  Ingreso = 'Ingreso',
  Egreso = 'Egreso',
}

export interface IMovimientoCaja {
  id: string;
  descripcion: string;
  estado: string;
  monto:number;
  tipoMovimiento: string;
  usuario: Usuario;
  ubicacion: Ubicacion;
  fecha: Date;
}
// Interfaz para el Usuario
interface Usuario {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

// Interfaz para la Ubicación
interface Ubicacion {
  id: string;
}


  export enum SaleStatus {
    DRAFT = 'draft',
    CONFIRMED = 'confirmed',
    CANCELED = 'canceled',
  }
  
  export interface ISalesOrder {
    id: string; 
    totalAmount: number;
    userId: string; 
    status: SaleStatus; 
    orderLines: ISalesOrderLine[];
    date: string; 
    locationId: string; 
  }
  
  export interface ISalesOrderLine {
    id: string; 
    productId: string;
    quantity: number; 
    unitPrice: number;
    orderId: string; 
    totalPrice: number;
  }
  