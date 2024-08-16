import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { CreateVisitorInput } from 'src/graphql/inputs/createVisitor';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(VisitorEntity)
    private visitorRepository: Repository<VisitorEntity>,
  ) {}

  async create(createVisitorInput: CreateVisitorInput): Promise<VisitorEntity> {
    const visitor = this.visitorRepository.create(createVisitorInput);
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
}
