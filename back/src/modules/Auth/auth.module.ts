import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../Users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../Users/entities/users.entity';
import { Location } from '../Location/entities/location.entity';
import { UsersService } from '../Users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Location]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, UsersService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
