import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserInput } from 'src/graphql/inputs/createUser';
export declare class UserRepository extends Repository<UserEntity> {
    findUserById(id: number): Promise<UserEntity>;
    findAllUsers(): Promise<UserEntity[]>;
    createUser(createUserData: CreateUserInput): Promise<UserEntity>;
}
