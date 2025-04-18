import { InjectRepository } from '@nestjs/typeorm';
import { Location } from './entities/location.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from '../Users/entities/users.entity';

@Injectable()
export class LocationRepository {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async createLocation(
    data: Partial<Location>,
    adminId: string,
  ): Promise<Location> {
    const location = this.locationRepository.create({
      ...data,
      admin: { id: adminId },
    });
    return await this.locationRepository.save(location);
  }

  async findAllLocationsByAdmin(adminId: string): Promise<Location[]> {
    return await this.locationRepository.find({
      where: { admin: { id: adminId } },
    });
  }

  async findAllLocationsByUser(userId: string): Promise<Location[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['locations'],
    });
  
    if (!user) {
      throw new Error('Usuario no encontrado');
    }
    console.log(user);
    
  
    return user.locations;
  }
  

  async findLocationById(locationId: string): Promise<Location> {
    return await this.locationRepository.findOne({ where: { id: locationId } });
  }

  async updateLocation(
    locationId: string,
    data: Partial<Location>,
  ): Promise<Location> {
    await this.locationRepository.update(locationId, data);
    return this.locationRepository.findOne({ where: { id: locationId } });
  }
}
