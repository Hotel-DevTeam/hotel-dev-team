import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async createLocation(data: Partial<Location>, adminId: string): Promise<Location> {
    const location = this.locationRepository.create({ ...data, admin: { id: adminId } });
    return await this.locationRepository.save(location);
  }

  async updateLocation(locationId: string, data: Partial<Location>): Promise<Location> {
    await this.locationRepository.update(locationId, data);
    return this.locationRepository.findOne({ where: { id: locationId } });
  }
}







