import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChecklistService } from 'src/modules/checklist/checklist.service';
import { ChecklistEntity } from 'src/database/entities/checklist.entity';
import { CreateChecklistInput } from 'src/graphql/inputs/createChecklistInput';
import { UpdateChecklistInput } from 'src/graphql/inputs/updateChecklistInput';
import { NotFoundException } from '@nestjs/common';
import { VisitorEntity } from 'src/database/entities/visitor.entity';

// Mock the ChecklistEntity repository
const mockChecklistRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

const createChecklist = (): ChecklistEntity => ({
  id: '1',
  title: 'Test Checklist',
  due_date: new Date('2023-12-31T00:00:00Z'),
  category: 'Test Category',
  notes: 'Test Notes',
  completed: false,
  visitor: {
    id: 'visitor-id',
    email: 'visitor@example.com',
    password: 'password',
    visitor_fname: 'John',
    visitor_lname: 'Doe',
    partner_fname: 'Jane',
    partner_lname: 'Doe',
    engaged_date: '2023-01-01',
    wed_date: '2024-01-01',
    wed_venue: 'Test Venue',
    profile_pic_url: 'profile.jpg',
    phone: '1234567890',
    city: 'Test City',
    reviews: [],
    myVendors: [],
    guestlist: [],
    checklists: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  } as VisitorEntity,
  createdAt: new Date(),
  updatedAt: new Date(),
});

describe('ChecklistService', () => {
  let service: ChecklistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChecklistService,
        {
          provide: getRepositoryToken(ChecklistEntity),
          useValue: mockChecklistRepository,
        },
      ],
    }).compile();

    service = module.get<ChecklistService>(ChecklistService);

    getRepositoryToken(ChecklistEntity);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getByVisitor', () => {
    it('should return checklists for a visitor', async () => {
      const visitorId = 'visitor-id';
      const checklists = [createChecklist()];

      mockChecklistRepository.find.mockResolvedValue(checklists);

      const result = await service.getByVisitor(visitorId);

      expect(result).toEqual(checklists);
      expect(mockChecklistRepository.find).toHaveBeenCalledWith({
        where: { visitor: { id: visitorId } },
      });
    });
  });

  describe('create', () => {
    it('should create and return a checklist', async () => {
      const createChecklistInput: CreateChecklistInput = {
        title: 'Test Checklist',
        due_date: '2023-12-31T00:00:00Z',
        category: 'Test Category',
        notes: 'Test Notes',
        completed: false,
        visitorId: 'visitor-id',
      };

      const checklist = createChecklist();

      mockChecklistRepository.create.mockReturnValue(checklist);
      mockChecklistRepository.save.mockResolvedValue(checklist);

      const result = await service.create(createChecklistInput);

      expect(result).toEqual(checklist);
      expect(mockChecklistRepository.create).toHaveBeenCalledWith({
        ...createChecklistInput,
        due_date: new Date(createChecklistInput.due_date),
        visitor: { id: createChecklistInput.visitorId },
      });
      expect(mockChecklistRepository.save).toHaveBeenCalledWith(checklist);
    });
  });

  describe('update', () => {
    it('should update and return a checklist', async () => {
      const updateChecklistInput: UpdateChecklistInput = {
        id: '1',
        title: 'Updated Checklist',
        due_date: '2024-01-01T00:00:00Z',
        category: 'Updated Category',
        notes: 'Updated Notes',
        completed: true,
      };

      const checklist = createChecklist();

      mockChecklistRepository.findOne.mockResolvedValue(checklist);
      mockChecklistRepository.save.mockResolvedValue({
        ...checklist,
        ...updateChecklistInput,
        due_date: new Date(updateChecklistInput.due_date),
      });

      const result = await service.update(updateChecklistInput);

      expect(result).toEqual({
        ...checklist,
        ...updateChecklistInput,
        due_date: new Date(updateChecklistInput.due_date),
      });
      expect(mockChecklistRepository.findOne).toHaveBeenCalledWith({
        where: { id: updateChecklistInput.id },
      });
      expect(mockChecklistRepository.save).toHaveBeenCalledWith({
        ...checklist,
        ...updateChecklistInput,
        due_date: new Date(updateChecklistInput.due_date),
      });
    });

    it('should throw an error if checklist is not found', async () => {
      const updateChecklistInput: UpdateChecklistInput = {
        id: '1',
        title: 'Updated Checklist',
      };

      mockChecklistRepository.findOne.mockResolvedValue(null);

      await expect(service.update(updateChecklistInput)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('delete', () => {
    it('should delete a checklist and return true', async () => {
      const id = '1';

      mockChecklistRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.delete(id);

      expect(result).toBe(true);
      expect(mockChecklistRepository.delete).toHaveBeenCalledWith(id);
    });

    it('should return false if checklist is not found', async () => {
      const id = '1';

      mockChecklistRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.delete(id);

      expect(result).toBe(false);
      expect(mockChecklistRepository.delete).toHaveBeenCalledWith(id);
    });
  });
});
