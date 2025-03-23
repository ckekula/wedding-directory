import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { GuestListService } from 'src/modules/guestlist/guestlist.service';
import { GuestListEntity } from 'src/database/entities/guestlist.entity';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { CreateGuestListInput } from 'src/graphql/inputs/createGuestList.input';
import { UpdateGuestListInput } from 'src/graphql/inputs/updateGuestList.input';

// Mock the GuestListRepository methods
const mockGuestListRepository = {
  createGuestList: jest.fn(),
  updateGuestList: jest.fn(),
  deleteGuestList: jest.fn(),
  findGuestListById: jest.fn(),
  findGuestListsByVisitor: jest.fn(),
};

// Mock the VisitorRepository methods
const mockVisitorRepository = {
  findOne: jest.fn(),
};

// Mock the DataSource
const mockDataSource = {
  getRepository: jest.fn().mockImplementation((entity) => {
    if (entity === GuestListEntity) {
      // Mock the repository with the `extend` method
      return {
        extend: jest.fn().mockReturnValue(mockGuestListRepository),
      };
    }
    return null;
  }),
};

describe('GuestListService', () => {
  let service: GuestListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuestListService,
        { provide: DataSource, useValue: mockDataSource }, // Provide the mock DataSource
        {
          provide: 'VisitorEntityRepository', // Provide the mock VisitorRepository
          useValue: mockVisitorRepository,
        },
      ],
    }).compile();

    service = module.get<GuestListService>(GuestListService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createGuestList', () => {
    it('should create and return a guest list', async () => {
      const createGuestListInput: CreateGuestListInput = {
        name: 'John Doe',
        number: '1234567890',
        address: '123 Main St',
        contact: '1234567890',
        email: 'john@example.com',
        status: 'confirmed',
        visitor_id: 'visitor-id',
      };

      const visitor = { id: 'visitor-id' } as VisitorEntity;
      const guestList = {
        id: '1',
        ...createGuestListInput,
        visitor,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as GuestListEntity;

      mockVisitorRepository.findOne.mockResolvedValue(visitor);
      mockGuestListRepository.createGuestList.mockResolvedValue(guestList);

      const result = await service.createGuestList(createGuestListInput);

      expect(result).toEqual(guestList);
      expect(mockVisitorRepository.findOne).toHaveBeenCalledWith({
        where: { id: createGuestListInput.visitor_id },
      });
      expect(mockGuestListRepository.createGuestList).toHaveBeenCalledWith(
        createGuestListInput,
        visitor,
      );
    });

    it('should throw an error if visitor is not found', async () => {
      const createGuestListInput: CreateGuestListInput = {
        name: 'John Doe',
        number: '1234567890',
        address: '123 Main St',
        contact: '1234567890',
        email: 'john@example.com',
        status: 'confirmed',
        visitor_id: 'visitor-id',
      };

      mockVisitorRepository.findOne.mockResolvedValue(null);

      await expect(
        service.createGuestList(createGuestListInput),
      ).rejects.toThrow('Visitor not found');
    });
  });

  describe('updateGuestList', () => {
    it('should update and return a guest list', async () => {
      const id = '1';
      const updateGuestListInput: UpdateGuestListInput = {
        number: '0987654321',
        address: '456 Elm St',
        contact: '0987654321',
        email: 'jane@example.com',
        status: 'pending',
      };

      const updatedGuestList = {
        id,
        ...updateGuestListInput,
      } as GuestListEntity;

      mockGuestListRepository.updateGuestList.mockResolvedValue(
        updatedGuestList,
      );

      const result = await service.updateGuestList(id, updateGuestListInput);

      expect(result).toEqual(updatedGuestList);
      expect(mockGuestListRepository.updateGuestList).toHaveBeenCalledWith(
        id,
        updateGuestListInput,
      );
    });
  });

  describe('deleteGuestList', () => {
    it('should delete a guest list and return true', async () => {
      const id = '1';

      mockGuestListRepository.deleteGuestList.mockResolvedValue(true);

      const result = await service.deleteGuestList(id);

      expect(result).toBe(true);
      expect(mockGuestListRepository.deleteGuestList).toHaveBeenCalledWith(id);
    });
  });

  describe('findGuestListById', () => {
    it('should return a guest list by ID', async () => {
      const id = '1';
      const guestList = { id } as GuestListEntity;

      mockGuestListRepository.findGuestListById.mockResolvedValue(guestList);

      const result = await service.findGuestListById(id);

      expect(result).toEqual(guestList);
      expect(mockGuestListRepository.findGuestListById).toHaveBeenCalledWith(
        id,
      );
    });
  });

  describe('findGuestListsByVisitor', () => {
    it('should return guest lists by visitor ID', async () => {
      const visitorId = 'visitor-id';
      const guestLists = [
        { id: '1', visitor: { id: visitorId } },
      ] as GuestListEntity[];

      mockGuestListRepository.findGuestListsByVisitor.mockResolvedValue(
        guestLists,
      );

      const result = await service.findGuestListsByVisitor(visitorId);

      expect(result).toEqual(guestLists);
      expect(
        mockGuestListRepository.findGuestListsByVisitor,
      ).toHaveBeenCalledWith(visitorId);
    });
  });
});
