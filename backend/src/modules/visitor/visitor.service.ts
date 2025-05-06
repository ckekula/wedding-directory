import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VisitorEntity } from '../../database/entities/visitor.entity';
import { CreateVisitorInput } from '../../graphql/inputs/createVisitor.input';
import * as bcrypt from 'bcryptjs';
import { UpdateVisitorInput } from '../../graphql/inputs/updateVisitor.input';
import { ChecklistService } from '../checklist/checklist.service';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(VisitorEntity)
    private visitorRepository: Repository<VisitorEntity>,
    private ChecklistService: ChecklistService,
  ) {}

  async create(createVisitorInput: CreateVisitorInput): Promise<VisitorEntity> {
    const hashedPassword = bcrypt.hashSync(createVisitorInput.password, 12);
    const visitor = this.visitorRepository.create({
      ...createVisitorInput,
      password: hashedPassword,
    });
    return this.visitorRepository.save(visitor);
  }

  async findAllVisitors(): Promise<VisitorEntity[]> {
    return this.visitorRepository.find();
  }

  async findVisitorById(id: string): Promise<VisitorEntity> {
    return this.visitorRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.visitorRepository.delete(id);
  }

  public getVisitorByEmail(email: string): Promise<VisitorEntity | undefined> {
    return this.visitorRepository.findOne({ where: { email } });
  }

  async updateVisitor(
    id: string,
    updateVisitorInput: UpdateVisitorInput,
  ): Promise<VisitorEntity> {
    // Check if a password is provided in the update input
    if (updateVisitorInput.password) {
      // Hash the password before updating
      updateVisitorInput.password = bcrypt.hashSync(updateVisitorInput.password, 12);
    }
    
    await this.visitorRepository.update(id, updateVisitorInput);
    return this.findVisitorById(id);
  }

  async updateProfilePicture(visitorId: string, fileUrl: string): Promise<VisitorEntity> {
    // Find the visitor by ID
    const visitor = await this.visitorRepository.findOne({ where: { id: visitorId } });

    if (!visitor) {
      throw new Error('Visitor not found');
    }

    // Update the profile_pic_url field
    visitor.profile_pic_url = fileUrl;

    // Save the updated visitor to the database
    return await this.visitorRepository.save(visitor);
  }


  async setWeddingDate(visitorId: string, weddingDate: Date): Promise<VisitorEntity> {
  const visitor = await this.visitorRepository.findOne({
    where: { id: visitorId },
  });
  
  if (!visitor) {
    throw new NotFoundException(`Visitor with ID ${visitorId} not found`);
  }
  
  // Update wedding date
  visitor.weddingDate = weddingDate;
  await this.visitorRepository.save(visitor);
  
  // Generate or update checklist tasks
  await this.ChecklistService.handleWeddingDateChange(visitorId, weddingDate);
  
  return visitor;
}
}
