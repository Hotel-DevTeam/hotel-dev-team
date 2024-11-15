import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './rooms.service';
import { RoomController } from './rooms.controller';
import { RoomsRepository } from './room.repository';
import { Room } from './entities/rooms.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../Users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3h' },
    }),
    UsersModule,
  ],
  controllers: [RoomController],
  providers: [RoomService, RoomsRepository],
  exports: [RoomsRepository, RoomService],
})
export class RoomModule {}
