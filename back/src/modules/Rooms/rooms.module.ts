import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './rooms.service';
import { RoomController } from './rooms.controller';
import { RoomsRepository } from './room.repository';
import { Room } from './entities/rooms.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [RoomService, RoomsRepository],
})
export class RoomModule {}
