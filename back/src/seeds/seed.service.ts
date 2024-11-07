import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from '../modules/Location/entities/location.entity';
import { Room } from '../modules/Rooms/entities/rooms.entity';
import { Users } from '../modules/Users/entities/users.entity';
import { UserSeedService } from './user-seed.service'; 
import * as fs from 'fs';  
import * as path from 'path';  

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    private readonly userSeedService: UserSeedService,
  ) {}

  async seedUsers() {
    await this.userSeedService.seed(); 
  }
  
  async seedLocations() {
    const locationsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'locations.json'), 'utf-8')
    );
    await this.locationRepository.save(locationsData);
  }

  
  async seedRooms() {
    const roomsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'rooms.json'), 'utf-8')
    );
    await this.roomRepository.save(roomsData);
  }

  

  
  async run() {
    await this.seedUsers(); 
    await this.seedLocations();
    await this.seedRooms();
  }
}

