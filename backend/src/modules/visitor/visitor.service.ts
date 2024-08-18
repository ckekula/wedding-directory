import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { CreateVisitorInput } from 'src/graphql/inputs/create-visitor.input';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(VisitorEntity)
    private visitorRepository: Repository<VisitorEntity>,
  ) {}

  async create(createVisitorInput: CreateVisitorInput): Promise<VisitorEntity> {
    const hashedPassword = bcrypt.hashSync(createVisitorInput.password, 12);
    const visitor = this.visitorRepository.create({...createVisitorInput, password: hashedPassword});
    return this.visitorRepository.save(visitor);
  }

  async findAll(): Promise<VisitorEntity[]> {
    return this.visitorRepository.find();
  }

  async findOne(id: string): Promise<VisitorEntity> {
    return this.visitorRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.visitorRepository.delete(id);
  }

  public getVisitorByEmail(email: string): Promise<VisitorEntity | undefined> {
    return this.visitorRepository.findOne({ where: { email } });
  } 
}
