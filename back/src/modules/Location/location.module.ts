import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { Location } from './entities/location.entity';
import { RoomModule } from '../Rooms/rooms.module';
import { LocationRepository } from './location.repository';
import { RoomsRepository } from '../Rooms/room.repository';
import { AuthModule } from '../Auth/auth.module';
import { UsersModule } from '../Users/users.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([Location, RoomsRepository]),
    RoomModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationRepository],
  exports: [LocationService, LocationRepository], 
})
export class LocationModule {}
