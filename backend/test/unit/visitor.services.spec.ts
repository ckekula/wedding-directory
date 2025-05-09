import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VisitorService } from 'src/modules/visitor/visitor.service';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { CreateVisitorInput } from 'src/graphql/inputs/createVisitor.input';
import { UpdateVisitorInput } from 'src/graphql/inputs/updateVisitor.input';
import { ChecklistService } from 'src/modules/checklist/checklist.service';

// Mock the VisitorEntity repository
const mockVisitorRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
};

// Mock ChecklistService
const mockChecklistService = {
  handleWeddingDateChange: jest.fn(),
};

// Mock bcrypt.hashSync to return a consistent hash
jest.mock('bcryptjs', () => ({
  hashSync: jest.fn().mockReturnValue('hashedpassword'),
}));

describe('VisitorService', () => {
  let service: VisitorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitorService,
        {
          provide: getRepositoryToken(VisitorEntity),
          useValue: mockVisitorRepository,
        },
        {
          provide: ChecklistService,
          useValue: mockChecklistService,
        },
      ],
    }).compile();

    service = module.get<VisitorService>(VisitorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and return a visitor', async () => {
      const createVisitorInput: CreateVisitorInput = {
        email: 'test@example.com',
        password: 'password',
        visitor_fname: 'John',
        visitor_lname: 'Doe',
        partner_fname: 'Jane',
        partner_lname: 'Doe',
        engaged_date: '2023-01-01',
        wed_date: '2024-01-01',
        wed_venue: 'Test Venue',
        phone: '1234567890',
        city: 'Test City',
      };

      const visitor = {
        id: '1',
        ...createVisitorInput,
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as VisitorEntity;

      mockVisitorRepository.create.mockReturnValue(visitor);
      mockVisitorRepository.save.mockResolvedValue(visitor);

      const result = await service.create(createVisitorInput);

      expect(result).toEqual(visitor);
      expect(mockVisitorRepository.create).toHaveBeenCalledWith({
        ...createVisitorInput,
        password: 'hashedpassword',
      });
      expect(mockVisitorRepository.save).toHaveBeenCalledWith(visitor);
    });
  });

  describe('updateVisitor', () => {
    it('should update and return a visitor', async () => {
      const id = '1';
      const updateVisitorInput: UpdateVisitorInput = {
        email: 'updated@example.com',
        password: 'newpassword',
        visitor_fname: 'Updated John',
        visitor_lname: 'Updated Doe',
        partner_fname: 'Updated Jane',
        partner_lname: 'Updated Doe',
        engaged_date: '2023-02-01',
        wed_date: '2024-02-01',
        wed_venue: 'Updated Venue',
        phone: '0987654321',
        city: 'Updated City',
      };

      const visitor = {
        id,
        ...updateVisitorInput,
        password: 'hashedpassword',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as VisitorEntity;

      mockVisitorRepository.update.mockResolvedValue({ affected: 1 });
      mockVisitorRepository.findOne.mockResolvedValue(visitor);

      const result = await service.updateVisitor(id, updateVisitorInput);

      expect(result).toEqual(visitor);
      expect(mockVisitorRepository.update).toHaveBeenCalledWith(id, {
        ...updateVisitorInput,
        password: 'hashedpassword',
      });
      expect(mockVisitorRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('findAllVisitors', () => {
    it('should return all visitors', async () => {
      const visitors = [
        { id: '1', email: 'test1@example.com' },
        { id: '2', email: 'test2@example.com' },
      ] as VisitorEntity[];

      mockVisitorRepository.find.mockResolvedValue(visitors);

      const result = await service.findAllVisitors();

      expect(result).toEqual(visitors);
      expect(mockVisitorRepository.find).toHaveBeenCalled();
    });
  });

  describe('findVisitorById', () => {
    it('should return a visitor by ID', async () => {
      const id = '1';
      const visitor = { id, email: 'test@example.com' } as VisitorEntity;

      mockVisitorRepository.findOne.mockResolvedValue(visitor);

      const result = await service.findVisitorById(id);

      expect(result).toEqual(visitor);
      expect(mockVisitorRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('remove', () => {
    it('should delete a visitor', async () => {
      const id = '1';

      mockVisitorRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(id);

      expect(mockVisitorRepository.delete).toHaveBeenCalledWith(id);
    });
  });

  describe('getVisitorByEmail', () => {
    it('should return a visitor by email', async () => {
      const email = 'test@example.com';
      const visitor = { id: '1', email } as VisitorEntity;

      mockVisitorRepository.findOne.mockResolvedValue(visitor);

      const result = await service.getVisitorByEmail(email);

      expect(result).toEqual(visitor);
      expect(mockVisitorRepository.findOne).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('updateProfilePicture', () => {
    it('should update the profile picture and return the visitor', async () => {
      const visitorId = '1';
      const fileUrl = 'profile.jpg';
      const visitor = {
        id: visitorId,
        email: 'test@example.com',
        profile_pic_url: fileUrl,
      } as VisitorEntity;

      mockVisitorRepository.findOne.mockResolvedValue(visitor);
      mockVisitorRepository.save.mockResolvedValue(visitor);

      const result = await service.updateProfilePicture(visitorId, fileUrl);

      expect(result).toEqual(visitor);
      expect(mockVisitorRepository.findOne).toHaveBeenCalledWith({
        where: { id: visitorId },
      });
      expect(mockVisitorRepository.save).toHaveBeenCalledWith(visitor);
    });

    it('should throw an error if visitor is not found', async () => {
      const visitorId = '1';
      const fileUrl = 'profile.jpg';

      mockVisitorRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateProfilePicture(visitorId, fileUrl),
      ).rejects.toThrow('Visitor not found');
    });
  });

  describe('setWeddingDate', () => {
    it('should update the wedding date and call checklist service', async () => {
      const visitorId = '1';
      const weddingDate = new Date('2025-12-25');
      const visitor = {
        id: visitorId,
        weddingDate: null,
      } as VisitorEntity;

      mockVisitorRepository.findOne.mockResolvedValue(visitor);
      mockVisitorRepository.save.mockResolvedValue({
        ...visitor,
        weddingDate,
      });

      const result = await service.setWeddingDate(visitorId, weddingDate);

      expect(result.weddingDate).toEqual(weddingDate);
      expect(mockVisitorRepository.findOne).toHaveBeenCalledWith({
        where: { id: visitorId },
      });
      expect(mockVisitorRepository.save).toHaveBeenCalledWith({
        ...visitor,
        weddingDate,
      });
      expect(mockChecklistService.handleWeddingDateChange).toHaveBeenCalledWith(
        visitorId,
        weddingDate,
      );
    });

    it('should throw NotFoundException if visitor is not found', async () => {
      const visitorId = 'nonexistent';
      const weddingDate = new Date('2025-12-25');

      mockVisitorRepository.findOne.mockResolvedValue(null);

      await expect(
        service.setWeddingDate(visitorId, weddingDate),
      ).rejects.toThrow(`Visitor with ID ${visitorId} not found`);
    });
  });
});
