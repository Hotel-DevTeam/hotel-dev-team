import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async createUser(user: Partial<Users>): Promise<Partial<Users>> {
    const newUser = await this.usersRepository.save(user);

    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });

    const { password, isAdmin, ...userNoSensitiveInfo } = dbUser;

    return userNoSensitiveInfo;
  }

  async getAllUsers(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });

    return users.map(
      ({ password, isAdmin, ...userNoPassword }) => userNoPassword,
    );
  }

  async getOneUser(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user)
      throw new NotFoundException(`No se encontró el usuario con el id ${id}`);

    const { password, ...userNoSensitiveInfo } = user;

    return userNoSensitiveInfo;
  }

  async updateUser(id: string, user: Partial<Users>): Promise<Partial<Users>> {
    if (Object.keys(user).length === 0) {
      throw new BadRequestException('No update values provided');
    }
    await this.usersRepository.update(id, user);
    const updateUser = await this.usersRepository.findOneBy({ id });

    if (!updateUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, isAdmin, ...userNoSensitiveInfo } = updateUser;

    return userNoSensitiveInfo;
  }

  async deleteUser(id: string): Promise<Partial<Users>> {
    const user = await this.usersRepository.findOneBy({ id });
    this.usersRepository.remove(user);

    const { password, isAdmin, ...userNoSensitiveInfo } = user;

    return userNoSensitiveInfo;
  }

  async getUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async findOneById(id: string) {
    return await this.usersRepository.findOneBy({ id });
  }
}
