import { EntityRepository, Repository } from 'typeorm';
import { Chat } from '../entities/chat.entity';

@EntityRepository(Chat)
export class ChatRepository extends Repository<Chat> { }