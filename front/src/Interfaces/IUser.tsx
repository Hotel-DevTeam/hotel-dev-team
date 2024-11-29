export interface ILoginUser {
    email:string;
    password:string;
}

export enum Role {
  Admin = 'admin',
  Recep = 'receptionist',
  Emplo = 'employee',
}

export interface IUserRegister {
    email:string;
    name:string;
    password:string;
    confirmPassword:string;
    role: Role;
}

export interface INotificationProps {
    message: string; 
  }

  
export interface IUserContextType {
    user: IUserResponse | null;
    setUser: React.Dispatch<React.SetStateAction<IUserResponse | null>>;
    isLogged: boolean;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
    setIsLogged: (isLogged: boolean) => void;
    signIn: (credentials: ILoginUser) => Promise<boolean>;
    signUp: (user: IUserRegister) => Promise<boolean>;
    logOut: () => void;
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
  }
  
  export interface IUserResponse {
    message: string;
    token: string;
    role:Role
     }

  export interface ILoginResponse {
    message: string;
    token: string;
    role:Role
  }
  

  export interface ILocation {
    id?:string;
    name?:string;
    address?:string;
    imgUrl?:string;
  }
  
export enum Tipo {
  Consumible = 'Consumible',
  Servicio = 'Servicio'
}

export interface IProduct {
  id:string;
  tipo: Tipo;
  nombre:string;
  Activo:boolean;
  foto:string;
  ubicacion:ILocation;
}



export interface IProductsPageProps {
  products: IProduct[];
}


export interface ICardProductProps {
  product: IProduct;
  onToggleStatus: (id: string) => void; 
  onEdit: (id: string) => void;       
}

export interface ILoginClientProps {
  setToken: (token: string | null) => void;
}