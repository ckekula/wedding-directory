import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { VendorService } from 'src/modules/vendor/vendor.service';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { CreateVendorInput } from 'src/graphql/inputs/createVendor.input';
import { UpdateVendorInput } from 'src/graphql/inputs/updateVendor.input';
import * as bcrypt from 'bcryptjs';
import { getEntities } from '../../src/database/entities/index';
import { of } from 'rxjs';

describe('VendorService Integration Tests', () => {
  let app: INestApplication;
  let vendorService: VendorService;
  let httpService: HttpService;
  let testVendorId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        HttpModule,
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            url: configService.get('TEST_DATABASE_URL'),
            entities: getEntities(),
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([VendorEntity]),
      ],
      providers: [VendorService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    vendorService = moduleFixture.get<VendorService>(VendorService);
    httpService = moduleFixture.get<HttpService>(HttpService);

    // Mock HTTP requests if needed
    jest
      .spyOn(httpService, 'request')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockImplementation(() => of({ data: {} } as any));
  });

  afterAll(async () => {
    if (testVendorId) {
      try {
        await vendorService.deleteVendor(testVendorId);
      } catch (e) {
        console.log('Error cleaning up test vendor:', e);
      }
    }
    await app.close();
  });

  const verifyPasswordHash = async (
    plainPassword: string,
    hashedPassword: string,
  ) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    expect(isMatch).toBe(true);
  };

  describe('Vendor CRUD Operations', () => {
    it('should create a new vendor', async () => {
      const createVendorInput: CreateVendorInput = {
        email: `test_${Date.now()}@example.com`,
        password: 'TestVendor123!',
        fname: 'Integration',
        lname: 'Test',
        busname: 'Test Business',
        phone: '1234567890',
        city: 'Test City',
        location: 'Test Location',
      };

      const result = await vendorService.createVendor(createVendorInput);
      testVendorId = result.id;

      expect(result).toBeDefined();
      expect(result.email).toBe(createVendorInput.email);
      await verifyPasswordHash(createVendorInput.password, result.password);
    });

    it('should fail to create vendor with duplicate email', async () => {
      const duplicateEmail = `duplicate_${Date.now()}@example.com`;
      const firstVendorInput: CreateVendorInput = {
        email: duplicateEmail,
        password: 'FirstVendor123!',
        fname: 'First',
        lname: 'Vendor',
        busname: 'First Business',
        phone: '1111111111',
        city: 'First City',
        location: 'First Location',
      };

      // Create first vendor
      await vendorService.createVendor(firstVendorInput);

      // Try to create second vendor with same email
      const secondVendorInput: CreateVendorInput = {
        ...firstVendorInput,
        fname: 'Second',
        phone: '2222222222',
      };

      await expect(
        vendorService.createVendor(secondVendorInput),
      ).rejects.toThrow('Email already exists');
    });
  });

  describe('Find Vendors', () => {
    it('should find a vendor by ID', async () => {
      expect(testVendorId).toBeDefined();
      const vendor = await vendorService.findVendorById(testVendorId);
      expect(vendor).toBeDefined();
      expect(vendor.id).toBe(testVendorId);
    });

    it('should find all vendors', async () => {
      const vendors = await vendorService.findAllVendors();
      expect(Array.isArray(vendors)).toBe(true);
      expect(vendors.length).toBeGreaterThan(0);
    });

    it('should return null when finding non-existent vendor', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const vendor = await vendorService.findVendorById(nonExistentId);
      expect(vendor).toBeNull();
    });  });

  describe('Update Vendor', () => {
    it('should update vendor information', async () => {
      // This test depends on the create test above
      expect(testVendorId).toBeDefined();
      const updateVendorInput: UpdateVendorInput = {
        fname: 'Updated',
        lname: 'Name',
        busname: 'Updated Business',
        city: 'New City',
        about: 'This is an updated about section',
      };

      const updatedVendor = await vendorService.updateVendor(
        testVendorId,
        updateVendorInput,
      );

      expect(updatedVendor).toBeDefined();
      expect(updatedVendor.fname).toBe(updateVendorInput.fname);
      expect(updatedVendor.lname).toBe(updateVendorInput.lname);
      expect(updatedVendor.busname).toBe(updateVendorInput.busname);
      expect(updatedVendor.city).toBe(updateVendorInput.city);
      expect(updatedVendor.about).toBe(updateVendorInput.about);
    });

    it('should update password with proper hashing', async () => {
      expect(testVendorId).toBeDefined();

      const newPassword = 'NewSecureVendorPassword456!';
      const updateVendorInput: UpdateVendorInput = {
        password: newPassword,
      };

      const updatedVendor = await vendorService.updateVendor(
        testVendorId,
        updateVendorInput,
      );

      expect(updatedVendor).toBeDefined();
      await verifyPasswordHash(newPassword, updatedVendor.password);
    });
  });

  describe('Delete Vendor', () => {
    it('should delete a vendor from the database', async () => {
      // Create a separate vendor for deletion test
      const createVendorInput: CreateVendorInput = {
        email: `delete_test_${Date.now()}@example.com`,
        password: 'DeleteTest123!',
        fname: 'Delete',
        lname: 'Test',
        busname: 'Delete Business',
        phone: '5555555555',
        city: 'Delete City',
        location: 'Delete Location',
      };

      const createdVendor = await vendorService.createVendor(createVendorInput);
      expect(createdVendor).toBeDefined();

      // Delete the vendor
      await vendorService.deleteVendor(createdVendor.id);

      // Verify it was deleted
      const findResult = await vendorService.findVendorById(createdVendor.id);
      expect(findResult).toBeNull();
    });
  });
});
