import { UserEntity } from 'src/database/entities/user.entity';
import { CreateUserInput } from 'src/graphql/inputs/createUser';
import { UserRepository } from 'src/database/repositories/user.repository';
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getUserById(id: number): Promise<UserEntity>;
    getAllUsers(): Promise<UserEntity[]>;
    createUser(createUserData: CreateUserInput): Promise<UserEntity>;
}
