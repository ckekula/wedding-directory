import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserInput } from 'src/graphql/inputs/createUser';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async getUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findUserById(id);
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.findAllUsers();
  }

  async createUser(createUserData: CreateUserInput): Promise<UserEntity> {
    return this.userRepository.createUser(createUserData);
  }
}