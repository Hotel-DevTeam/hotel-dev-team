import { Body, Controller, Param, Post, Put, Get } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { CreateRoomDto} from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/rooms.entity';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post(':locationId')
  async createRoom(
    @Param('locationId') locationId: string,
    @Body() data: CreateRoomDto,
  ): Promise<Room> {
    return this.roomService.createRoom(locationId, data);
  }

  @Put(':roomId')
  async updateRoom(
    @Param('roomId') roomId: string,
    @Body() data: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomService.updateRoom(roomId, data);
  }

  @Get(':locationId')
  async getRoomsByLocation(@Param('locationId') locationId: string): Promise<Room[]> {
    return this.roomService.getRoomsByLocation(locationId);
  }
}
