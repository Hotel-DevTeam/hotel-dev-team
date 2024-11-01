import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from '../Users/dto/userDto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Users } from '../Users/entities/users.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Traer a todos los usuarios' })
  async getAuth(@Headers('authorization') authHeader: string): Promise<Users> {
    if (!authHeader) {
      throw new UnauthorizedException('Autorization header is missing');
    }
    const token = authHeader.split(' ')[1];
    return this.AuthService.getAuth(token);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Iniciar Sesión' })
  async signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;

    return await this.AuthService.signIn(email, password);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Registrarse (Crear un nuevo usuario)' })
  signUp(@Body() user: CreateUserDto) {
    return this.AuthService.signUp(user);
  }
}
