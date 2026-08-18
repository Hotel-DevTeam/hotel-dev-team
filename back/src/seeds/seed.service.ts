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
      fs.readFileSync(path.join(__dirname, 'locations.json'), 'utf-8'),
    );
    for (const { adminId, ...location } of locationsData) {
      const saved = await this.locationRepository.save({
        ...location,
        admin: { id: adminId },
      });
      const [{ count }] = await this.locationRepository.query(
        'SELECT COUNT(*) FROM user_locations WHERE "userId" = $1 AND "locationId" = $2',
        [adminId, saved.id],
      );
      if (Number(count) === 0) {
        await this.locationRepository
          .createQueryBuilder()
          .relation(Location, 'usersWithAccess')
          .of(saved)
          .add(adminId);
      }
    }
  }

  async seedRooms() {
    const roomsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, 'rooms.json'), 'utf-8'),
    );
    for (const { locationId, ...room } of roomsData) {
      const exists = await this.roomRepository.findOne({
        where: { number: room.number, location: { id: locationId } },
      });
      if (!exists) {
        await this.roomRepository.save({
          ...room,
          location: { id: locationId },
        });
      }
    }
  }

  async run() {
    await this.seedUsers();
    await this.seedLocations();
    await this.seedRooms();
  }
}
