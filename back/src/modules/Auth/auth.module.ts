import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from '../Users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../Users/entities/users.entity';
import { UsersService } from '../Users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, UsersService],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
