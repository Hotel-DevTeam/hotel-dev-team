import { IUserRegister } from "@/components/Interfaces/IUser";

export const validationRegister = (userRegister: IUserRegister) => {
  const errors: { name?: string; email?: string; password?: string; confirmPassword?: string;} = {};

  // Validar nombre
  if (!userRegister.name) {
    errors.name = "Debes ingresar un nombre";
  } else if (userRegister.name.length < 3 || userRegister.name.length > 50) {
    errors.name = "El nombre debe tener entre 3 y 50 caracteres";
  }

  // Validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userRegister.email) {
    errors.email = "Debes ingresar un correo electrónico";
  } else if (!emailRegex.test(userRegister.email)) {
    errors.email = "El correo electrónico no es válido";
  }

  // Validar contraseña
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
  if (!userRegister.password) {
    errors.password = "Debes ingresar una contraseña";
  } else if (!passwordRegex.test(userRegister.password)) {
    errors.password =
      "La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)";
  }

  // Validar confirmación de contraseña
  if (!userRegister.confirmPassword) {
    errors.confirmPassword = "Debes confirmar la contraseña";
  } else if (userRegister.confirmPassword !== userRegister.password) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }



  return errors;
};
