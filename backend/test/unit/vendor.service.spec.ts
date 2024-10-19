import { Test, TestingModule } from '@nestjs/testing';
import { VendorService } from 'src/modules/vendor/vendor.service';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { DataSource } from 'typeorm';
import { HttpService } from '@nestjs/axios';

// Create a mock of the vendor repository that includes the necessary methods
const mockVendorRepository = {
  findAllVendors: jest.fn(),
  extend: jest.fn().mockReturnThis(), // If you're using extend, mock it to return the same object
};

describe('VendorService', () => {
  let service: VendorService;
  let dataSourceMock: Partial<DataSource>;

  beforeEach(async () => {
    // Mock dataSource.getRepository to return the mock vendor repository
    dataSourceMock = {
      getRepository: jest.fn().mockReturnValue(mockVendorRepository),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VendorService,
        { provide: DataSource, useValue: dataSourceMock }, // Use the mock DataSource
        { provide: HttpService, useValue: {} }, // Mock HttpService as needed
      ],
    }).compile();

    service = module.get<VendorService>(VendorService);
  });

  it('should return all vendors', async () => {
    const vendors: VendorEntity[] = [{
        id: "1", fname: 'Vendor 1',
        email: '',
        password: '',
        lname: '',
        location: '',
        city: '',
        busname: '',
        phone: '',
        profile_pic_url: '',
        createdAt: undefined,
        updatedAt: undefined,
        offering: []
    }, {
        id: "2", fname: 'Vendor 2',
        email: '',
        password: '',
        lname: '',
        location: '',
        city: '',
        busname: '',
        phone: '',
        profile_pic_url: '',
        createdAt: undefined,
        updatedAt: undefined,
        offering: []
    }];

    // Mock the findAllVendors method to return the vendor data
    mockVendorRepository.findAllVendors.mockResolvedValue(vendors);

    const result = await service.findAllVendors();
    expect(result).toBe(vendors);
  });

  it('should throw an error when repository throws an error', async () => {
    // Mock the findAllVendors method to throw an error
    mockVendorRepository.findAllVendors.mockRejectedValue(new Error('Repository error'));

    await expect(service.findAllVendors()).rejects.toThrowError('Repository error');
  });
});
