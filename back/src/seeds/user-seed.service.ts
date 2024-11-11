import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../modules/Users/entities/users.entity';
import { Role } from '../modules/Users/roles.enum';
import { hash } from 'bcrypt';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
  ) {}

  async seed() {
    const defaultUser = {
      name: 'Angelina Admin',
      email: 'admin@example.com',
      password: await hash('password123', 10),
      role: Role.Admin,
      id: '61672613-e397-420b-92d2-c1fb788be64d',
    };

    const userExists = await this.userRepository.findOne({
      where: { email: defaultUser.email },
    });

    if (!userExists) {
      await this.userRepository.save(defaultUser);
      console.log('Usuario por defecto creado');
    } else {
      console.log('Usuario por defecto ya existe');
    }
  }
}
