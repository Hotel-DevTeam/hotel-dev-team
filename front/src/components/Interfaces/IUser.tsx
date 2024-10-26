export interface ILoginUser {
    email:string;
    password:string;
}

export interface IUserRegister {
    email:string;
    name:string;
    password:string;
    confirmPassword:string;
}

export interface INotificationProps {
    message: string; 
  }
