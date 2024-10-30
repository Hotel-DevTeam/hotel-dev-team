import { Body, Controller, Param, Post, Put, Get, UseGuards } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/create-room.dto';
import { Room } from './entities/rooms.entity';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { RolesGuard } from '../Auth/guards/roles.guard';
import { Roles } from '../Decorators/roles.decorator';
import { Role } from '../Users/roles.enum';

@Controller('rooms')
@ApiTags('Rooms')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard) 
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post(':locationId')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear una nueva habitación en una ubicación específica' })
  @ApiResponse({ status: 201, description: 'La habitación ha sido creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Error en la creación de la habitación.' })
  async createRoom(
    @Param('locationId') locationId: string,
    @Body() data: CreateRoomDto,
  ): Promise<Room> {
    return this.roomService.createRoom(locationId, data);
  }

  @Put(':roomId')
  @ApiOperation({ summary: 'Actualizar los detalles de una habitación' })
  @ApiResponse({ status: 200, description: 'La habitación ha sido actualizada correctamente.' })
  @ApiResponse({ status: 404, description: 'Habitación no encontrada.' })
  @ApiResponse({ status: 400, description: 'Error en la actualización de la habitación.' })
  async updateRoom(
    @Param('roomId') roomId: string,
    @Body() data: UpdateRoomDto,
  ): Promise<Room> {
    return this.roomService.updateRoom(roomId, data);
  }

  @Get(':locationId')
  @ApiOperation({ summary: 'Obtener todas las habitaciones de una ubicación específica' })
  @ApiResponse({ status: 200, description: 'Lista de habitaciones de la ubicación especificada.' })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada.' })
  async getRoomsByLocation(@Param('locationId') locationId: string): Promise<Room[]> {
    return this.roomService.getRoomsByLocation(locationId);
  }
}
