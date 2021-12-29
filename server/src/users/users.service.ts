import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/input/create-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    return this.usersRepository.findOneOrFail(id);
  }

  async findUserByLogin(login: string): Promise<User> {
    return this.usersRepository.findOne({
      where: {
        login,
      },
    });
  }

  createUser(createUserInput: CreateUserInput) {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }
}
