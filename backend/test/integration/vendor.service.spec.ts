import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VendorService } from 'src/modules/vendor/vendor.service';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { CreateVendorInput } from 'src/graphql/inputs/createVendor.input';
import { UpdateVendorInput } from 'src/graphql/inputs/updateVendor.input';
import { HttpModule } from '@nestjs/axios';
import * as bcrypt from 'bcryptjs';
// Import function to get all entities
import { getEntities } from 'src/database/entities';

describe('VendorService Integration Tests', () => {
  let app: INestApplication;
  let vendorService: VendorService;
  let testVendorId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            url: configService.get('DATABASE_URL'),
            entities: getEntities(), // Use all entities from your application
            synchronize: true, // Only for testing
          }),
        }),
        TypeOrmModule.forFeature([VendorEntity]),
        HttpModule,
      ],
      providers: [VendorService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    vendorService = moduleFixture.get<VendorService>(VendorService);
  });

  afterAll(async () => {
    // Clean up created test data if testVendorId was set
    if (testVendorId) {
      try {
        await vendorService.deleteVendor(testVendorId);
      } catch (e) {
        console.log('Error cleaning up test vendor:', e);
      }
    }
    await app.close();
  });

  // Helper function to compare vendor data
  const compareVendorData = (vendor: VendorEntity, inputData) => {
    expect(vendor).toBeDefined();
    expect(vendor.email).toBe(inputData.email);
    expect(vendor.fname).toBe(inputData.fname);
    expect(vendor.lname).toBe(inputData.lname);
    expect(vendor.busname).toBe(inputData.busname);
    expect(vendor.phone).toBe(inputData.phone);
    expect(vendor.city).toBe(inputData.city);
    expect(vendor.location).toBe(inputData.location);
    if (inputData.about) expect(vendor.about).toBe(inputData.about);
    // Don't compare passwords directly
  };

  const verifyPasswordHash = async (plainPassword: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    expect(isMatch).toBe(true);
  };

  describe('Create Vendor', () => {
    it('should create a new vendor in the database', async () => {
      const createVendorInput: CreateVendorInput = {
        email: `vendor_test_${Date.now()}@example.com`, // Use timestamp to ensure uniqueness
        password: 'TestPassword123!',
        fname: 'Integration',
        lname: 'Test',
        busname: 'Test Business',
        phone: '1234567890',
        city: 'Test City',
        location: 'Test Location',
      };

      const result = await vendorService.createVendor(createVendorInput);
      
      // Save the created vendor ID for cleanup
      testVendorId = result.id;
      
      // Verify the vendor was created with correct data
      compareVendorData(result, createVendorInput);
      
      // Verify password was hashed
      await verifyPasswordHash(createVendorInput.password, result.password);
    });

    it('should throw an error if email already exists', async () => {
      // Create a vendor with a unique email
      const email = `duplicate_email_${Date.now()}@example.com`;
      const createVendorInput: CreateVendorInput = {
        email,
        password: 'TestPassword123!',
        fname: 'Duplicate',
        lname: 'Test',
        busname: 'Duplicate Business',
        phone: '9876543210',
        city: 'Duplicate City',
        location: 'Duplicate Location',
      };

      await vendorService.createVendor(createVendorInput);
      
      // Try to create another vendor with the same email
      await expect(vendorService.createVendor(createVendorInput)).rejects.toThrow('Email already exists');
      
      // Clean up
      const vendor = await vendorService.getVendorByEmail(email);
      if (vendor) {
        await vendorService.deleteVendor(vendor.id);
      }
    });
  });

  describe('Find Vendors', () => {
    it('should find a vendor by ID', async () => {
      // This test depends on the create test above
      expect(testVendorId).toBeDefined();
      
      const vendor = await vendorService.findVendorById(testVendorId);
      expect(vendor).toBeDefined();
      expect(vendor.id).toBe(testVendorId);
    });

    it('should find a vendor by email', async () => {
      // Create a unique vendor for this test
      const email = `email_lookup_${Date.now()}@example.com`;
      const createVendorInput: CreateVendorInput = {
        email,
        password: 'TestPassword123!',
        fname: 'Email',
        lname: 'Lookup',
        busname: 'Email Business',
        phone: '5555555555',
        city: 'Email City',
        location: 'Email Location',
      };

      const createdVendor = await vendorService.createVendor(createVendorInput);
      
      // Find by email
      const foundVendor = await vendorService.getVendorByEmail(email);
      
      expect(foundVendor).toBeDefined();
      expect(foundVendor.email).toBe(email);
      
      // Clean up
      await vendorService.deleteVendor(createdVendor.id);
    });

    it('should return null when finding non-existent vendor', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const vendor = await vendorService.findVendorById(nonExistentId);
      expect(vendor).toBeNull();
    });

    it('should find all vendors', async () => {
      const vendors = await vendorService.findAllVendors();
      expect(Array.isArray(vendors)).toBe(true);
    });
  });

  describe('Update Vendor', () => {
    it('should update vendor information', async () => {
      // This test depends on the create test above
      expect(testVendorId).toBeDefined();
      
      const updateVendorInput: UpdateVendorInput = {
        fname: 'Updated',
        lname: 'Name',
        busname: 'Updated Business',
        city: 'New City',
        about: 'This is an updated test vendor profile.',
      };
      
      const updatedVendor = await vendorService.updateVendor(testVendorId, updateVendorInput);
      
      expect(updatedVendor).toBeDefined();
      expect(updatedVendor.fname).toBe(updateVendorInput.fname);
      expect(updatedVendor.lname).toBe(updateVendorInput.lname);
      expect(updatedVendor.busname).toBe(updateVendorInput.busname);
      expect(updatedVendor.city).toBe(updateVendorInput.city);
      expect(updatedVendor.about).toBe(updateVendorInput.about);
    });

    it('should update password with proper hashing', async () => {
      // This test depends on the create test above
      expect(testVendorId).toBeDefined();
      
      const newPassword = 'NewSecurePassword456!';
      const updateVendorInput: UpdateVendorInput = {
        password: newPassword,
      };
      
      const updatedVendor = await vendorService.updateVendor(testVendorId, updateVendorInput);
      
      expect(updatedVendor).toBeDefined();
      await verifyPasswordHash(newPassword, updatedVendor.password);
    });

  });

  describe('Delete Vendor', () => {
    it('should delete a vendor from the database', async () => {
      // Create a vendor specifically for deletion test
      const email = `delete_test_${Date.now()}@example.com`;
      const createVendorInput: CreateVendorInput = {
        email,
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

    it('should throw an error when deleting non-existent vendor', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      
      await expect(
        vendorService.deleteVendor(nonExistentId)
      ).rejects.toThrow('Vendor not found');
    });
  });
});