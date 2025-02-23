import { Injectable } from '@nestjs/common';
import { RoomsRepository } from './room.repository';
import { Room } from './entities/rooms.entity';

@Injectable()
export class RoomService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async createRoom(locationId: string, data: Partial<Room>): Promise<Room> {
    return this.roomsRepository.createRoom(locationId, data);
  }

  async updateRoom(roomId: string, data: Partial<Room>): Promise<Room> {
    return this.roomsRepository.updateRoom(roomId, data);
  }

  async getRoomsByLocation(locationId: string): Promise<Room[]> {
    return this.roomsRepository.getRoomsByLocation(locationId);
  }

  async getRoomsById(roomId: string): Promise<Room[]> {    
    return this.roomsRepository.getRoomsById(roomId);
  }
}
