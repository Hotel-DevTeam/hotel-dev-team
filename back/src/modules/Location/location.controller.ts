import { Body, Controller, Param, Post, Put, Get, UseGuards, Request } from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '../Location/entities/location.entity';
import { RoomService } from '../Rooms/rooms.service';
import { CreateReservationDto } from 'src/reservations/dto/create-reservation.dto';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateRoomDto } from '../Rooms/dto/create-room.dto';
import { UpdateRoomDto } from '../Rooms/dto/update-room.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Controller('location')
@UseGuards(AuthGuard)
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly roomService: RoomService,
  ) {}

  @Post()
  async createLocation(@Body() data: CreateLocationDto, @Request() req): Promise<Location> {
    return await this.locationService.createLocation(data, req.user.id);
  }

  @Put(':locationId')
  async updateLocation(@Param('locationId') locationId: string, @Body() data: UpdateLocationDto): Promise<Location> {
    return await this.locationService.updateLocation(locationId, data);
  }

  @Post(':locationId/rooms')
  async createRoom(@Param('locationId') locationId: string, @Body() data: CreateRoomDto) {
    return await this.locationService.createRoom(locationId, data);
  }

  @Put('/rooms/:roomId')
  async updateRoom(@Param('roomId') roomId: string, @Body() data: UpdateRoomDto) {
    return await this.locationService.updateRoom(roomId, data);
  }

  /*
  @Post('/rooms/:roomId/reservations')
  async createReservation(@Param('roomId') roomId: string, @Body() data: CreateReservationDto) {
    return await this.roomService.createReservation(roomId, data);
  }
  */

  @Get(':locationId/rooms')
  async getRooms(@Param('locationId') locationId: string) {
    return await this.locationService.getRoomsByLocation(locationId);
  }
}
