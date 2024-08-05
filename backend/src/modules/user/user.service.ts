import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserInput } from 'src/graphql/inputs/createUser';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserData: CreateUserInput): Promise<UserEntity> {
    const user = this.userRepository.create(createUserData);
    return this.userRepository.save(user);
  }
}
