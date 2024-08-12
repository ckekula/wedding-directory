import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserInput } from 'src/graphql/inputs/createUser';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(createUserData: CreateUserInput): Promise<UserEntity> {
    return this.userRepository.createUser(createUserData);
  }
}
