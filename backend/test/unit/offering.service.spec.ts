import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { OfferingEntity } from 'src/database/entities/offering.entity';
import { OfferingService } from 'src/modules/offering/offering.service';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { CreateOfferingInput } from 'src/graphql/inputs/createOffering.input';
import { UpdateOfferingInput } from 'src/graphql/inputs/updateOffering.input';
import { OfferingFilterInput } from 'src/graphql/inputs/offeringFilter.input';

// Mock the OfferingRepository methods
const mockOfferingRepository = {
  createOffering: jest.fn(),
  updateOffering: jest.fn(),
  deleteOffering: jest.fn(),
  findOfferingById: jest.fn(),
  findOfferingsByFilters: jest.fn(),
  findOfferingsByVendor: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
};

const createOffering = (): OfferingEntity => ({
  id: '1',
  name: 'Test Offering',
  category: 'Test Category',
  visible: true,
  bus_phone: '1234567890',
  bus_email: 'test@example.com',
  description: 'Test Description',
  banner: 'test-banner.jpg',
  video_showcase: [],
  photo_showcase: [],
  website: 'https://example.com',
  instagram: 'https://instagram.com',
  facebook: 'https://facebook.com',
  x: 'https://x.com',
  tiktok: 'https://tiktok.com',
  createdAt: new Date(),
  updatedAt: new Date(),
  vendor: {
    id: 'vendor-id',
    email: 'vendor@example.com',
    password: 'password',
    fname: 'John',
    lname: 'Doe',
    location: 'Test Location',
    city: 'Test City',
    busname: 'Test Business',
    phone: '1234567890',
    profile_pic_url: 'profile.jpg',
    about: 'Test About',
    createdAt: new Date(),
    updatedAt: new Date(),
    offering: [],
  } as VendorEntity,
  review: [],
  myVendors: [],
  packages: [],
});

// Mock the VendorRepository methods
const mockVendorRepository = {
  findOne: jest.fn(),
};

// Mock the DataSource
const mockDataSource = {
  getRepository: jest.fn().mockImplementation((entity) => {
    if (entity === OfferingEntity) {
      // Mock the repository with the `extend` method
      return {
        extend: jest.fn().mockReturnValue(mockOfferingRepository),
      };
    } else if (entity === VendorEntity) {
      return mockVendorRepository;
    }
    return null;
  }),
};

// Mock the HttpService
const mockHttpService = {
  request: jest.fn(),
};

describe('OfferingService', () => {
  let service: OfferingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferingService,
        { provide: DataSource, useValue: mockDataSource }, // Provide the mock DataSource
        { provide: HttpService, useValue: mockHttpService }, // Provide the mock HttpService
        {
          provide: 'VendorEntityRepository', // Provide the mock VendorRepository
          useValue: mockVendorRepository,
        },
      ],
    }).compile();

    service = module.get<OfferingService>(OfferingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createOffering', () => {
    it('should create and return an offering', async () => {
      const createOfferingInput: CreateOfferingInput = {
        vendor_id: 'vendor-id',
        name: 'Test Offering',
        category: 'Test Category',
      };

      const vendor = { id: 'vendor-id' } as VendorEntity;
      const offering = createOffering();

      mockVendorRepository.findOne.mockResolvedValue(vendor);
      mockOfferingRepository.createOffering.mockResolvedValue(offering);

      const result = await service.createOffering(createOfferingInput);

      expect(result).toEqual(offering);
      expect(mockVendorRepository.findOne).toHaveBeenCalledWith({
        where: { id: createOfferingInput.vendor_id },
      });
      expect(mockOfferingRepository.createOffering).toHaveBeenCalledWith(
        createOfferingInput,
        vendor,
      );
    });

    it('should throw an error if vendor is not found', async () => {
      const createOfferingInput: CreateOfferingInput = {
        vendor_id: 'vendor-id',
        name: 'Test Offering',
        category: 'Test Category',
      };

      mockVendorRepository.findOne.mockResolvedValue(null);

      await expect(service.createOffering(createOfferingInput)).rejects.toThrow(
        'Vendor not found',
      );
    });
  });

  describe('updateOffering', () => {
    it('should update and return an offering', async () => {
      const id = '1';
      const updateOfferingInput: UpdateOfferingInput = {
        category: 'Updated Category',
        visible: true,
        bus_phone: '1234567890',
        bus_email: 'test@example.com',
        description: 'Updated Description',
        banner: 'updated-banner.jpg',
        photo_showcase: ['image1.jpg', 'image2.jpg'],
        video_showcase: ['video1.mp4', 'video2.mp4'],
        pricing: 'Updated Pricing',
        website: 'https://updated.com',
        instagram: 'https://instagram.com/updated',
        facebook: 'https://facebook.com/updated',
        x: 'https://x.com/updated',
        tiktok: 'https://tiktok.com/updated',
      };

      const updatedOffering = { id, ...updateOfferingInput } as OfferingEntity;

      mockOfferingRepository.updateOffering.mockResolvedValue(updatedOffering);

      const result = await service.updateOffering(id, updateOfferingInput);

      expect(result).toEqual(updatedOffering);
      expect(mockOfferingRepository.updateOffering).toHaveBeenCalledWith(
        id,
        updateOfferingInput,
      );
    });
  });

  describe('deleteOffering', () => {
    it('should delete an offering and return true', async () => {
      const id = '1';

      mockOfferingRepository.deleteOffering.mockResolvedValue(true);

      const result = await service.deleteOffering(id);

      expect(result).toBe(true);
      expect(mockOfferingRepository.deleteOffering).toHaveBeenCalledWith(id);
    });
  });

  describe('findOfferingById', () => {
    it('should return an offering by ID', async () => {
      const id = '1';
      const offering = { id } as OfferingEntity;

      mockOfferingRepository.findOfferingById.mockResolvedValue(offering);

      const result = await service.findOfferingById(id);

      expect(result).toEqual(offering);
      expect(mockOfferingRepository.findOfferingById).toHaveBeenCalledWith(id);
    });
  });

  describe('findOfferingsByFilters', () => {
    it('should return offerings based on filters', async () => {
      const filterInput: OfferingFilterInput = {
        category: 'Test Category',
        city: 'Test City',
      };

      const offerings = [
        { id: '1', category: 'Test Category' },
      ] as OfferingEntity[];

      mockOfferingRepository.findOfferingsByFilters.mockResolvedValue(
        offerings,
      );

      const result = await service.findOfferingsByFilters(filterInput);

      expect(result).toEqual(offerings);
      expect(
        mockOfferingRepository.findOfferingsByFilters,
      ).toHaveBeenCalledWith(filterInput.category, filterInput.city);
    });
  });

  describe('findOfferingsByVendor', () => {
    it('should return offerings by vendor ID', async () => {
      const vendorId = 'vendor-id';
      const offerings = [
        { id: '1', vendor: { id: vendorId } },
      ] as OfferingEntity[];

      mockOfferingRepository.findOfferingsByVendor.mockResolvedValue(offerings);

      const result = await service.findOfferingsByVendor(vendorId);

      expect(result).toEqual(offerings);
      expect(mockOfferingRepository.findOfferingsByVendor).toHaveBeenCalledWith(
        vendorId,
      );
    });
  });

  describe('updateOfferingBanner', () => {
    it('should update the banner and return the offering', async () => {
      const id = '1';
      const fileUrl = 'banner.jpg';
      const offering = { id, banner: fileUrl } as OfferingEntity;

      mockOfferingRepository.findOne.mockResolvedValue(offering);
      mockOfferingRepository.save.mockResolvedValue(offering);

      const result = await service.updateOfferingBanner(id, fileUrl);

      expect(result).toEqual(offering);
      expect(mockOfferingRepository.findOne).toHaveBeenCalledWith({
        where: { id },
      });
      expect(mockOfferingRepository.save).toHaveBeenCalledWith(offering);
    });

    it('should throw an error if offering is not found', async () => {
      const id = '1';
      const fileUrl = 'banner.jpg';

      mockOfferingRepository.findOne.mockResolvedValue(null);

      await expect(service.updateOfferingBanner(id, fileUrl)).rejects.toThrow(
        'Offering not found',
      );
    });
  });

  describe('updateOfferingShowcaseImages', () => {
    // it('should update the showcase images and return the offering', async () => {
    //   const id = '1';
    //   const fileUrls = ['image1.jpg', 'image2.jpg'];
    //   const offering = { id, photo_showcase: fileUrls } as OfferingEntity;

    //   mockOfferingRepository.findOne.mockResolvedValue(offering);
    //   mockOfferingRepository.save.mockResolvedValue(offering);

    //   const result = await service.updateOfferingShowcaseImages(id, fileUrls);

    //   expect(result).toEqual(offering);
    //   expect(mockOfferingRepository.findOne).toHaveBeenCalledWith({
    //     where: { id },
    //   });
    //   expect(mockOfferingRepository.save).toHaveBeenCalledWith(offering);
    // });

    it('should throw an error if offering is not found', async () => {
      const id = '1';
      const fileUrls = ['image1.jpg', 'image2.jpg'];

      mockOfferingRepository.findOne.mockResolvedValue(null);

      await expect(
        service.updateOfferingShowcaseImages(id, fileUrls),
      ).rejects.toThrow('Offering not found');
    });
  });

  describe('updateOfferingVideos', () => {
    //   it('should update the videos and return the offering', async () => {
    //     const id = '1';
    //     const fileUrls = ['video1.mp4', 'video2.mp4'];
    //     const offering = { id, video_showcase: fileUrls } as OfferingEntity;

    //     mockOfferingRepository.findOne.mockResolvedValue(offering);
    //     mockOfferingRepository.save.mockResolvedValue(offering);

    //     const result = await service.updateOfferingVideos(id, fileUrls);

    //     expect(result).toEqual(offering);
    //     expect(mockOfferingRepository.findOne).toHaveBeenCalledWith({
    //       where: { id },
    //     });
    //     expect(mockOfferingRepository.save).toHaveBeenCalledWith(offering);
    //   });

    it('should throw an error if offering is not found', async () => {
      const id = '1';
      const fileUrls = ['video1.mp4', 'video2.mp4'];

      mockOfferingRepository.findOne.mockResolvedValue(null);

      await expect(service.updateOfferingVideos(id, fileUrls)).rejects.toThrow(
        'Offering not found',
      );
    });
  });
});
