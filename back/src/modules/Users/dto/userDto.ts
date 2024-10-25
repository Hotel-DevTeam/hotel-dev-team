import { ApiProperty, ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "../../Decorators/matchPassword.decorator";
import { Role } from "../roles.enum";

export class CreateUserDto {
    /** 
     * Debe ser un string entre 3 y 50 caracteres
     * @example 'Conti'
     */
    @ApiProperty({
        description: 'El nombre del usuario, debe ser un string entre 3 y 50 caracteres',
        example: 'Conti',
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    name: string;

    /**
     * Debe ser un string y un email valido
     * @example 'conti@example.com'
     */
    @ApiProperty({
        description: 'El correo electrónico del usuario, debe ser un email válido',
        example: 'conti@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * Debe ser un string entre 8 y 15 caracteres, con al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales !@#$%^&*
     * @example 'aaBB12345#'
     */
    @ApiProperty({
        description: 'La contraseña debe tener entre 8 y 15 caracteres, con al menos una letra minúscula, una letra mayúscula, un número y un carácter especial (!@#$%^&*)',
        example: 'aaBB12345#',
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
        message:
        'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*'
    })
    @MinLength(8)
    @MaxLength(15)
    password: string;

    /** 
     * Debe ser igual a la password
     * @example 'aaBB12345#'
     */
    @ApiProperty({
        description: 'La confirmación de la contraseña debe ser igual a la contraseña',
        example: 'aaBB12345#',
    })
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    /**
     * El rol del usuario debe ser uno de los siguientes valores: admin, receptionist, o employee
     * @example 'admin'
     */
    @ApiProperty({
        description: 'El rol del usuario debe ser uno de los siguientes: admin, receptionist, o employee',
        example: 'admin',
    })
    @IsEnum(Role, {
        message: 'El rol debe ser uno de los siguientes: admin, receptionist, employee'
    })
    @IsNotEmpty()
    role: Role;

    /**
     * El campo isAdmin debe estar vacío, es un valor calculado
     */
    @ApiHideProperty() // Si no quieres que aparezca en Swagger
    @IsEmpty()
    isAdmin?: boolean;
}

// DTO para el login
export class LoginUserDto extends PickType(CreateUserDto, ['email', 'password', 'name']) {}

// DTO para la actualización de usuario
export class UpdateUserDto extends PickType(CreateUserDto, ['name', 'email', 'role']) {}
