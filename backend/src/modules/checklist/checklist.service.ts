import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChecklistEntity } from '../../database/entities/checklist.entity';
import { Repository } from 'typeorm';
import { CreateChecklistInput } from '../../graphql/inputs/createChecklistInput';
import { UpdateChecklistInput } from '../../graphql/inputs/updateChecklistInput';
import { VisitorEntity } from '../../database/entities/visitor.entity';
@Injectable()
export class ChecklistService {
  constructor(
    @InjectRepository(ChecklistEntity)
    private readonly checklistRepository: Repository<ChecklistEntity>,
    @InjectRepository(VisitorEntity)
    private readonly visitorRepository: Repository<VisitorEntity>,
  ) {}

  async getByVisitor(visitorId: string): Promise<ChecklistEntity[]> {
    return this.checklistRepository.find({
      where: { visitor: { id: visitorId } },
    });
  }

  async create(input: CreateChecklistInput): Promise<ChecklistEntity> {
    const checklist = this.checklistRepository.create({
      ...input,
      due_date: new Date(input.due_date),
      visitor: { id: input.visitorId },
    });
    return this.checklistRepository.save(checklist);
  }

  async update(input: UpdateChecklistInput): Promise<ChecklistEntity> {
    const checklist = await this.checklistRepository.findOne({ where: { id: input.id } });
    if (!checklist) throw new NotFoundException('Checklist not found');

    Object.assign(checklist, input);
    if (input.due_date) checklist.due_date = new Date(input.due_date);

    return this.checklistRepository.save(checklist);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.checklistRepository.delete(id);
    return result.affected > 0;
  }

  async generateDefaultTasks(visitorId: string, weddingDate: Date): Promise<void>{
    //find visitor 
    const visitor = await this.visitorRepository.findOne({ where: { id: visitorId } });
    if (!visitor) {
      throw new NotFoundException('Visitor with ID ${visitorId} not found');
    }

    //Default tasks
  const defaultTasks=[

    //venue 
     { title: "Research and estimate costs for venues", category: "Venue", daysBeforeWedding: 365 },
      { title: "Explore and tour venues", category: "Venue", daysBeforeWedding: 335 },
      { title: "Book ceremony venue", category: "Venue", daysBeforeWedding: 300 },
      { title: "Book reception venue", category: "Venue", daysBeforeWedding: 300 },
      { title: "Sign venue contracts", category: "Venue", daysBeforeWedding: 280 },
      { title: "Research rehearsal dinner venues", category: "Venue", daysBeforeWedding: 250 },
      { title: "Schedule rehearsal dinner venue tours", category: "Venue", daysBeforeWedding: 220 },
      { title: "Book rehearsal dinner venue", category: "Venue", daysBeforeWedding: 200 },
      { title: "Order venue rentals", category: "Venue", daysBeforeWedding: 180 },
      
      // Wedding Website
      { title: "Browse website designs", category: "Wedding Website", daysBeforeWedding: 300 },
      { title: "Create wedding website", category: "Wedding Website", daysBeforeWedding: 275 },
      { title: "Add event details", category: "Wedding Website", daysBeforeWedding: 250 },
      { title: "Add registry information", category: "Wedding Website", daysBeforeWedding: 225 },
      { title: "Add travel and accommodation information", category: "Wedding Website", daysBeforeWedding: 200 },
      { title: "Set up RSVP functionality", category: "Wedding Website", daysBeforeWedding: 180 },
      { title: "Share website with guests", category: "Wedding Website", daysBeforeWedding: 150 },
      
      // Photos and Videos
      { title: "Research photographers", category: "Photos and Videos", daysBeforeWedding: 300 },
      { title: "Meet with photographers", category: "Photos and Videos", daysBeforeWedding: 270 },
      { title: "Book photographer", category: "Photos and Videos", daysBeforeWedding: 250 },
      { title: "Schedule engagement photos", category: "Photos and Videos", daysBeforeWedding: 220 },
      { title: "Research videographers", category: "Photos and Videos", daysBeforeWedding: 280 },
      { title: "Meet with videographers", category: "Photos and Videos", daysBeforeWedding: 250 },
      { title: "Book videographer", category: "Photos and Videos", daysBeforeWedding: 230 },
      { title: "Create photo shot list", category: "Photos and Videos", daysBeforeWedding: 60 },
      
      // Food and Drink
      { title: "Research caterers", category: "Food and Drink", daysBeforeWedding: 270 },
      { title: "Schedule tastings", category: "Food and Drink", daysBeforeWedding: 240 },
      { title: "Book caterer", category: "Food and Drink", daysBeforeWedding: 220 },
      { title: "Choose menu options", category: "Food and Drink", daysBeforeWedding: 180 },
      { title: "Research cake bakers", category: "Food and Drink", daysBeforeWedding: 210 },
      { title: "Schedule cake tastings", category: "Food and Drink", daysBeforeWedding: 180 },
      { title: "Design cake", category: "Food and Drink", daysBeforeWedding: 150 },
      { title: "Book cake baker", category: "Food and Drink", daysBeforeWedding: 140 },
      { title: "Finalize bar options", category: "Food and Drink", daysBeforeWedding: 120 },
      
      // Attire
      { title: "Research wedding dress/suit styles", category: "Attire", daysBeforeWedding: 300 },
      { title: "Shop for wedding attire", category: "Attire", daysBeforeWedding: 270 },
      { title: "Purchase/order wedding attire", category: "Attire", daysBeforeWedding: 240 },
      { title: "Choose wedding accessories", category: "Attire", daysBeforeWedding: 210 },
      { title: "Select wedding party attire", category: "Attire", daysBeforeWedding: 180 },
      { title: "Schedule first fitting", category: "Attire", daysBeforeWedding: 120 },
      { title: "Schedule final fitting", category: "Attire", daysBeforeWedding: 30 },
      
      // Music
      { title: "Research DJs or bands", category: "Music", daysBeforeWedding: 270 },
      { title: "Meet with potential music vendors", category: "Music", daysBeforeWedding: 240 },
      { title: "Book music vendor", category: "Music", daysBeforeWedding: 210 },
      { title: "Select ceremony music", category: "Music", daysBeforeWedding: 90 },
      { title: "Choose special songs (first dance, etc.)", category: "Music", daysBeforeWedding: 90 },
      { title: "Create reception playlist", category: "Music", daysBeforeWedding: 60 },
      { title: "Finalize do-not-play list", category: "Music", daysBeforeWedding: 30 },
      
      // Flowers & Decor
      { title: "Research florists", category: "Flowers & Decor", daysBeforeWedding: 240 },
      { title: "Meet with florists", category: "Flowers & Decor", daysBeforeWedding: 210 },
      { title: "Book florist", category: "Flowers & Decor", daysBeforeWedding: 180 },
      { title: "Choose ceremony decorations", category: "Flowers & Decor", daysBeforeWedding: 150 },
      { title: "Choose reception decorations", category: "Flowers & Decor", daysBeforeWedding: 150 },
      { title: "Finalize centerpieces", category: "Flowers & Decor", daysBeforeWedding: 120 },
      { title: "Confirm floral order details", category: "Flowers & Decor", daysBeforeWedding: 60 },
      
      // Registry
      { title: "Research registry options", category: "Registry", daysBeforeWedding: 240 },
      { title: "Select registry stores", category: "Registry", daysBeforeWedding: 210 },
      { title: "Create registries", category: "Registry", daysBeforeWedding: 180 },
      { title: "Add items to registry", category: "Registry", daysBeforeWedding: 180 },
      { title: "Share registry details", category: "Registry", daysBeforeWedding: 150 },
      { title: "Update registry as needed", category: "Registry", daysBeforeWedding: 90 },
      
      // Invitations and Paper
      { title: "Choose invitation design", category: "Invitations and Paper", daysBeforeWedding: 180 },
      { title: "Order save-the-dates", category: "Invitations and Paper", daysBeforeWedding: 180 },
      { title: "Send save-the-dates", category: "Invitations and Paper", daysBeforeWedding: 150 },
      { title: "Finalize invitation wording", category: "Invitations and Paper", daysBeforeWedding: 120 },
      { title: "Order invitations", category: "Invitations and Paper", daysBeforeWedding: 90 },
      { title: "Address invitations", category: "Invitations and Paper", daysBeforeWedding: 60 },
      { title: "Mail invitations", category: "Invitations and Paper", daysBeforeWedding: 60 },
      { title: "Track RSVPs", category: "Invitations and Paper", daysBeforeWedding: 45 },
  ];
    
    // Generate tasks with due dates based on wedding date
    for (const task of defaultTasks) {
      const dueDate = new Date(weddingDate);
      dueDate.setDate(dueDate.getDate() - task.daysBeforeWedding);
      
      // Create checklist item
      await this.checklistRepository.save({
        title: task.title,
        category: task.category,
        due_date: dueDate,
        completed: false,
        notes: '',
        visitor: visitor,
      });
    }
    
  }

  async handleWeddingDateChange(visitorId: string, newWeddingDate: Date): Promise<void> {
    // Check if tasks already exist for this visitor
    const existingTasks = await this.checklistRepository.find({
      where: { visitor: { id: visitorId } },
    });
    
    if (existingTasks.length > 0) {
      // Delete existing tasks and recreate them
      await this.checklistRepository.delete({ visitor: { id: visitorId } });
    }
    
    // Generate new tasks based on the new wedding date
    await this.generateDefaultTasks(visitorId, newWeddingDate);
  }

}
