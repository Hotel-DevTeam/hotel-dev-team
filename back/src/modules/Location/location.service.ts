import { Injectable } from '@nestjs/common';
import { LocationRepository } from './location.repository';
import { RoomsRepository } from '../Rooms/room.repository';
import { Location } from './entities/location.entity';
import { Room } from '../Rooms/entities/rooms.entity';
import { RoomService } from '../Rooms/rooms.service';

@Injectable()
export class LocationService {
  constructor(
    private readonly locationRepository: LocationRepository,
    private readonly roomRepository: RoomsRepository,
    private readonly roomService: RoomService,
  ) {}

  async createLocation(
    data: Partial<Location>,
    adminId: string,
  ): Promise<Location> {
    return this.locationRepository.createLocation(data, adminId);
  }

  async getAllLocationsByAdmin(adminId: string): Promise<Location[]> {
    return this.locationRepository.findAllLocationsByAdmin(adminId);
  }

  async getLocationById(locationId: string): Promise<Location> {
    return this.locationRepository.findLocationById(locationId);
  }

  async updateLocation(
    locationId: string,
    data: Partial<Location>,
  ): Promise<Location> {
    return this.locationRepository.updateLocation(locationId, data);
  }

  async createRoom(locationId: string, data: Partial<Room>): Promise<Room> {
    return this.roomRepository.createRoom(locationId, data);
  }

  async updateRoom(roomId: string, data: Partial<Room>): Promise<Room> {
    return this.roomRepository.updateRoom(roomId, data);
  }

  async getRoomsByLocation(locationId: string): Promise<Room[]> {
    return this.roomRepository.getRoomsByLocation(locationId);
  }

  /*
  async createReservation(roomId: string, data: CreateReservationDto): Promise<Reservation> {
    return this.roomService.createReservation(roomId, data); 
  }
  */
}
