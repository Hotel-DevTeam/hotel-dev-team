import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(user: Partial<Users>): Promise<Partial<Users>> {
    return this.usersRepository.createUser(user);
  }

  async getAllUsers(page: number, limit: number): Promise<Partial<Users>[]> {
    return this.usersRepository.getAllUsers(page, limit);
  }

  async getOneUser(id: string): Promise<Partial<Users>> {
    return this.usersRepository.getOneUser(id);
  }

  async updateUser(id: string, user: Partial<Users>): Promise<Partial<Users>> {
    return this.usersRepository.updateUser(id, user);
  }

  async deleteUser(id: string): Promise<Partial<Users>> {
    return this.usersRepository.deleteUser(id);
  }

  async findOneById(id:string){
    return await this.usersRepository.findOneById(id)
}
}
