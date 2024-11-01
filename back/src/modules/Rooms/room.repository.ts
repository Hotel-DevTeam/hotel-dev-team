import { Injectable } from '@nestjs/common';
import { Room } from '../Rooms/entities/rooms.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsRepository {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async createRoom(locationId: string, data: Partial<Room>): Promise<Room> {
    const room = this.roomRepository.create({
      ...data,
      location: { id: locationId },
    });
    return await this.roomRepository.save(room);
  }

  async updateRoom(roomId: string, data: Partial<Room>): Promise<Room> {
    await this.roomRepository.update(roomId, data);
    return this.roomRepository.findOne({ where: { id: roomId } });
  }

  async getRoomsByLocation(locationId: string): Promise<Room[]> {
    return await this.roomRepository.find({
      where: { location: { id: locationId } },
      relations: ['reservations'],
    });
  }
}
