import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserInput } from 'src/graphql/inputs/createUser';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findUserById(id: number): Promise<UserEntity> {
    return this.findOne({ where: { id } });
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return this.find();
  }

  async createUser(createUserData: CreateUserInput): Promise<UserEntity> {
    const user = this.create(createUserData);
    return this.save(user);
  }
}