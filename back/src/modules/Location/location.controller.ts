import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { Location } from '../Location/entities/location.entity';
import { RoomService } from '../Rooms/rooms.service';
import { CreateReservationDto } from 'src/modules/reservations/dto/create-reservation.dto';
import { AuthGuard } from '../Auth/guards/auth.guard';
import { CreateLocationDto } from './dto/create-location.dto';
import { CreateRoomDto } from '../Rooms/dto/create-room.dto';
import { UpdateRoomDto } from '../Rooms/dto/create-room.dto';
import { UpdateLocationDto } from './dto/create-location.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../Auth/guards/roles.guard';
import { Roles } from '../Decorators/roles.decorator';
import { Role } from '../Users/roles.enum';
import { LongExtended } from 'typeorm/driver/mongodb/bson.typings';

@Controller('location')
@ApiTags('Location')
@UseGuards(AuthGuard, RolesGuard)
@ApiBearerAuth()
export class LocationController {
  constructor(
    private readonly locationService: LocationService,
    private readonly roomService: RoomService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear una nueva ubicación' })
  @ApiResponse({ status: 201, description: 'La ubicación ha sido creada.' })
  @ApiResponse({
    status: 400,
    description: 'Error en la creación de la ubicación.',
  })
  async createLocation(
    @Body() data: CreateLocationDto,
    @Request() req,
  ): Promise<Location> {
    return await this.locationService.createLocation(data, req.user.id);
  }

  @Get(':locationId')
   @Roles(Role.Admin)  
   @ApiOperation({ summary: 'Obtener una ubicación por ID' })
   @ApiResponse({ status: 200, description: 'Ubicación encontrada.' })
   @ApiResponse({ status: 404, description: 'Ubicación no encontrada.' })
  async getLocationById(@Param('locationId') locationId: string): Promise<Location> {
  return await this.locationService.getLocationById(locationId);
  }


  @Get('admin/locations')
  @Roles(Role.Admin)  
  @ApiOperation({ summary: 'Obtener todas las ubicaciones del administrador' })
  @ApiResponse({ status: 200, description: 'Ubicaciones del administrador obtenidas.' })
  async getAllLocationsByAdmin(@Request() req): Promise<Location[]> {
  return await this.locationService.getAllLocationsByAdmin(req.user.id);
 }

  @Put(':locationId')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Cambiar algún dato de una ubicación' })
  @ApiResponse({ status: 201, description: 'La ubicación ha sido modificada.' })
  @ApiResponse({
    status: 400,
    description: 'Error en modificar de la ubicación.',
  })
  async updateLocation(
    @Param('locationId') locationId: string,
    @Body() data: UpdateLocationDto,
  ): Promise<Location> {
    return await this.locationService.updateLocation(locationId, data);
  }

  @Post(':locationId/rooms')
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crear una nueva habitación en una ubicación' })
  @ApiResponse({
    status: 201,
    description: 'La habitación ha sido creada en la ubicación especifica.',
  })
  @ApiResponse({
    status: 400,
    description: 'Error en la creación de la habitación.',
  })
  async createRoom(
    @Param('locationId') locationId: string,
    @Body() data: CreateRoomDto,
  ) {
    return await this.locationService.createRoom(locationId, data);
  }

  @Put('/rooms/:roomId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar los datos de una habitación' })
  @ApiResponse({
    status: 200,
    description: 'La habitación ha sido actualizada correctamente.',
  })
  @ApiResponse({ status: 404, description: 'Habitación no encontrada.' })
  @ApiResponse({
    status: 400,
    description: 'Error en la actualización de la habitación.',
  })
  async updateRoom(
    @Param('roomId') roomId: string,
    @Body() data: UpdateRoomDto,
  ) {
    return await this.locationService.updateRoom(roomId, data);
  }

  @Get(':locationId/rooms')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener las habitaciones de una ubicación específica',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de habitaciones de la ubicación especificada.',
  })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada.' })
  async getRooms(@Param('locationId') locationId: string) {
    return await this.locationService.getRoomsByLocation(locationId);
  }
}
