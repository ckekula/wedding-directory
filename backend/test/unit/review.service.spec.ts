import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { ReviewService } from 'src/modules/review/review.service';
import { ReviewEntity } from 'src/database/entities/review.entity';
import { OfferingEntity } from 'src/database/entities/offering.entity';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { CreateReviewInput } from 'src/graphql/inputs/createReview.input';

// Mock the ReviewRepository methods
const mockReviewRepository = {
  createReview: jest.fn(),
  deleteReview: jest.fn(),
  findReviewById: jest.fn(),
  findReviewsByOffering: jest.fn(),
};

// Mock the OfferingRepository methods
const mockOfferingRepository = {
  findOne: jest.fn(),
};

// Mock the VisitorRepository methods
const mockVisitorRepository = {
  findOne: jest.fn(),
};

// Mock the DataSource
const mockDataSource = {
  getRepository: jest.fn().mockImplementation((entity) => {
    if (entity === ReviewEntity) {
      // Mock the repository with the `extend` method
      return {
        extend: jest.fn().mockReturnValue(mockReviewRepository),
      };
    }
    return null;
  }),
};

describe('ReviewService', () => {
  let service: ReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        { provide: DataSource, useValue: mockDataSource }, // Provide the mock DataSource
        {
          provide: 'OfferingEntityRepository', // Provide the mock OfferingRepository
          useValue: mockOfferingRepository,
        },
        {
          provide: 'VisitorEntityRepository', // Provide the mock VisitorRepository
          useValue: mockVisitorRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReview', () => {
    it('should create and return a review', async () => {
      const createReviewInput: CreateReviewInput = {
        comment: 'Great service!',
        rating: 5,
        offering_id: 'offering-id',
        visitor_id: 'visitor-id',
      };

      const offering = { id: 'offering-id' } as OfferingEntity;
      const visitor = { id: 'visitor-id' } as VisitorEntity;
      const review = {
        id: '1',
        ...createReviewInput,
        offering,
        visitor,
        createdAt: new Date(),
      } as ReviewEntity;

      mockOfferingRepository.findOne.mockResolvedValue(offering);
      mockVisitorRepository.findOne.mockResolvedValue(visitor);
      mockReviewRepository.createReview.mockResolvedValue(review);

      const result = await service.createReview(createReviewInput);

      expect(result).toEqual(review);
      expect(mockOfferingRepository.findOne).toHaveBeenCalledWith({
        where: { id: createReviewInput.offering_id },
      });
      expect(mockVisitorRepository.findOne).toHaveBeenCalledWith({
        where: { id: createReviewInput.visitor_id },
      });
      expect(mockReviewRepository.createReview).toHaveBeenCalledWith(
        createReviewInput,
        offering,
        visitor,
      );
    });

    it('should throw an error if offering is not found', async () => {
      const createReviewInput: CreateReviewInput = {
        comment: 'Great service!',
        rating: 5,
        offering_id: 'offering-id',
        visitor_id: 'visitor-id',
      };

      mockOfferingRepository.findOne.mockResolvedValue(null);

      await expect(service.createReview(createReviewInput)).rejects.toThrow(
        'Offering not found',
      );
    });

    it('should throw an error if visitor is not found', async () => {
      const createReviewInput: CreateReviewInput = {
        comment: 'Great service!',
        rating: 5,
        offering_id: 'offering-id',
        visitor_id: 'visitor-id',
      };

      const offering = { id: 'offering-id' } as OfferingEntity;

      mockOfferingRepository.findOne.mockResolvedValue(offering);
      mockVisitorRepository.findOne.mockResolvedValue(null);

      await expect(service.createReview(createReviewInput)).rejects.toThrow(
        'Visitor not found',
      );
    });
  });

  describe('deleteReview', () => {
    it('should delete a review and return true', async () => {
      const id = '1';

      mockReviewRepository.deleteReview.mockResolvedValue(true);

      const result = await service.deleteReview(id);

      expect(result).toBe(true);
      expect(mockReviewRepository.deleteReview).toHaveBeenCalledWith(id);
    });
  });

  describe('findReviewById', () => {
    it('should return a review by ID', async () => {
      const id = '1';
      const review = { id } as ReviewEntity;

      mockReviewRepository.findReviewById.mockResolvedValue(review);

      const result = await service.findReviewById(id);

      expect(result).toEqual(review);
      expect(mockReviewRepository.findReviewById).toHaveBeenCalledWith(id);
    });
  });

  describe('findReviewsByOffering', () => {
    it('should return reviews by offering ID', async () => {
      const offeringId = 'offering-id';
      const reviews = [
        { id: '1', offering: { id: offeringId } },
      ] as ReviewEntity[];

      mockReviewRepository.findReviewsByOffering.mockResolvedValue(reviews);

      const result = await service.findReviewsByOffering(offeringId);

      expect(result).toEqual(reviews);
      expect(mockReviewRepository.findReviewsByOffering).toHaveBeenCalledWith(
        offeringId,
      );
    });
  });
});
