import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findUserById(id: number): Promise<UserEntity> {
    return this.findOne({ where: { id } });
  }

  async findAllUsers(): Promise<UserEntity[]> {
    return this.find();
  }
}