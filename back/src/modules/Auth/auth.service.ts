import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../Users/users.repository';
import { Users } from '../Users/entities/users.entity';
import { Location } from '../Location/entities/location.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../Users/users.service';
import { Role } from '../Users/roles.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getAuth(token: string): Promise<Users> {
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = decoded.id;
      const user = await this.usersService.findOneById(userId);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async signIn(email: string, password: string) {
    if (!email || !password)
      throw new BadRequestException('Email or password are required');

    const user = await this.userRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('Invalid Credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new BadRequestException('Invalid Credentials');

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Logged-in User',
      token,
      role: user.role,
      user,
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password, role, locations: locationIds = [] } = user;

    const foundUser = await this.userRepository.getUserByEmail(email);
    if (foundUser) throw new BadRequestException('Registered Email');

    if (!Object.values(Role).includes(role as Role)) {
      throw new BadRequestException(
        'Invalid role. Allowed roles are: admin, receptionist, employee',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const locations = await this.locationRepository.findByIds(locationIds);

    const newUser = await this.userRepository.createUser({
      ...user,
      password: hashedPassword,
      locations: locations
    });

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'User Registered',
      token,
      role: newUser.role,
    };
  }
}
