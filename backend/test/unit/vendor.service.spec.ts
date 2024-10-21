import { Test, TestingModule } from '@nestjs/testing';
import { VendorService } from 'src/modules/vendor/vendor.service';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { DataSource } from 'typeorm';
import { HttpService } from '@nestjs/axios';

// Mock the vendor repository
const mockVendorRepository = {
  findAllVendors: jest.fn(),
  findVendorById: jest.fn(),
  extend: jest.fn().mockReturnThis(),
};

// Utility function to create a VendorEntity for testing
const createVendor = (id: string, fname: string): VendorEntity => ({
  id,
  fname,
  email: '',
  password: '',
  lname: '',
  about: '',
  location: '',
  city: '',
  busname: '',
  phone: '',
  profile_pic_url: '',
  createdAt: undefined,
  updatedAt: undefined,
  offering: [],
});

describe('VendorService', () => {
  let service: VendorService;
  let dataSourceMock: Partial<DataSource>;
  let httpServiceMock: Partial<HttpService>;

  // Modular setup function for creating the test module
  const createTestingModule = async (): Promise<TestingModule> => {
    dataSourceMock = {
      getRepository: jest.fn().mockReturnValue(mockVendorRepository),
    };

    httpServiceMock = {
      request: jest.fn(),
    };

    return await Test.createTestingModule({
      providers: [
        VendorService,
        { provide: DataSource, useValue: dataSourceMock },
        { provide: HttpService, useValue: httpServiceMock },
      ],
    }).compile();
  };

  beforeEach(async () => {
    const module = await createTestingModule();
    service = module.get<VendorService>(VendorService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAllVendors', () => {
    it('should return all vendors', async () => {
      const vendors: VendorEntity[] = [
        createVendor('1', 'Vendor 1'),
        createVendor('2', 'Vendor 2'),
      ];

      mockVendorRepository.findAllVendors.mockResolvedValue(vendors);

      const result = await service.findAllVendors();
      expect(result).toEqual(vendors);
      expect(mockVendorRepository.findAllVendors).toHaveBeenCalledTimes(1);
    });

    it('should throw an error when repository throws an error', async () => {
      mockVendorRepository.findAllVendors.mockRejectedValue(new Error('Repository error'));

      await expect(service.findAllVendors()).rejects.toThrowError('Repository error');
      expect(mockVendorRepository.findAllVendors).toHaveBeenCalledTimes(1);
    });
  });

  describe('findVendorById', () => {
    it('should return a vendor entity when the id is valid', async () => {
      const id = '123';
      const vendor = createVendor(id, 'Vendor 123');

      mockVendorRepository.findVendorById.mockResolvedValue(vendor);

      const result = await service.findVendorById(id);
      expect(result).toBe(vendor);
      expect(mockVendorRepository.findVendorById).toHaveBeenCalledWith(id);
      expect(mockVendorRepository.findVendorById).toHaveBeenCalledTimes(1);
    });

    it('should return null when the id is not found', async () => {
      const id = '123';

      mockVendorRepository.findVendorById.mockResolvedValue(null);

      const result = await service.findVendorById(id);
      expect(result).toBeNull();
      expect(mockVendorRepository.findVendorById).toHaveBeenCalledWith(id);
      expect(mockVendorRepository.findVendorById).toHaveBeenCalledTimes(1);
    });

    it('should throw an error for invalid id input', async () => {
      const invalidIds = [undefined, null, ''];

      expect.assertions(invalidIds.length);
      for (const id of invalidIds) {
        await expect(service.findVendorById(id)).rejects.toThrowError('Invalid ID');
      }
    });

    it('should handle repository errors gracefully', async () => {
      const id = '123';
      mockVendorRepository.findVendorById.mockRejectedValue(new Error('Repository error'));

      await expect(service.findVendorById(id)).rejects.toThrowError('Repository error');
      expect(mockVendorRepository.findVendorById).toHaveBeenCalledWith(id);
      expect(mockVendorRepository.findVendorById).toHaveBeenCalledTimes(1);
    });
  });
});
