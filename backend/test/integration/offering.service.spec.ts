import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { OfferingService } from 'src/modules/offering/offering.service';
import { OfferingEntity } from 'src/database/entities/offering.entity';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { CreateOfferingInput } from 'src/graphql/inputs/createOffering.input';
import { OfferingFilterInput } from 'src/graphql/inputs/offeringFilter.input';
// Import function to get all entities
import { getEntities } from 'src/database/entities';

describe('OfferingService Integration Tests', () => {
  let app: INestApplication;
  let offeringService: OfferingService;
  let testVendorId: string;
  let testOfferingId: string;

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
        TypeOrmModule.forFeature([OfferingEntity, VendorEntity]),
        HttpModule,
      ],
      providers: [OfferingService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    offeringService = moduleFixture.get<OfferingService>(OfferingService);

    // Create a test vendor for use in all tests
    const dataSource = moduleFixture.get('DATA_SOURCE');
    const vendorRepository = dataSource.getRepository(VendorEntity);
    const testVendor = vendorRepository.create({
      email: `offering_test_vendor_${Date.now()}@example.com`, // Use timestamp to ensure uniqueness
      password: 'TestPassword123!',
      fname: 'Test',
      lname: 'Vendor',
      location: 'Test Location',
      city: 'Test City',
      busname: 'Test Business',
      phone: '1234567890',
      profile_pic_url: 'https://example.com/profile.jpg',
      about: 'This is a test vendor',
    });

    const savedVendor = await vendorRepository.save(testVendor);
    testVendorId = savedVendor.id;
  });

  afterAll(async () => {
    // Clean up created test data
    if (testOfferingId) {
      try {
        await offeringService.deleteOffering(testOfferingId);
      } catch (e) {
        console.log('Error cleaning up test offering:', e);
      }
    }

    if (testVendorId) {
      try {
        const dataSource = app.get('DATA_SOURCE');
        const vendorRepository = dataSource.getRepository(VendorEntity);
        await vendorRepository.delete(testVendorId);
      } catch (e) {
        console.log('Error cleaning up test vendor:', e);
      }
    }
    await app.close();
  });

  // Helper function to compare offering data
  const compareOfferingData = (offering: OfferingEntity, inputData) => {
    expect(offering).toBeDefined();
    expect(offering.id).toBeDefined();
    expect(offering.name).toBe(inputData.name);
    expect(offering.category).toBe(inputData.category);
    expect(offering.vendor.id).toBe(inputData.vendor_id || testVendorId);
    
    // Check optional fields if provided in input
    if (inputData.description) expect(offering.description).toBe(inputData.description);
    if (inputData.bus_phone) expect(offering.bus_phone).toBe(inputData.bus_phone);
    if (inputData.bus_email) expect(offering.bus_email).toBe(inputData.bus_email);
    if (inputData.website) expect(offering.website).toBe(inputData.website);
    if (inputData.visible !== undefined) expect(offering.visible).toBe(inputData.visible);
  };

  describe('Create Offering', () => {
    it('should create a new offering in the database', async () => {
      const createOfferingInput: CreateOfferingInput = {
        vendor_id: testVendorId,
        name: `Test Offering ${Date.now()}`, // Use timestamp for uniqueness
        category: 'Photography',
      };

      const result = await offeringService.createOffering(createOfferingInput);
      
      // Save the created offering ID for cleanup and future tests
      testOfferingId = result.id;
      
      // Verify the offering was created with correct data
      compareOfferingData(result, createOfferingInput);
    });

    it('should throw an error when vendor does not exist', async () => {
      const createOfferingInput: CreateOfferingInput = {
        vendor_id: '00000000-0000-0000-0000-000000000000', // Non-existent vendor ID
        name: 'Invalid Offering',
        category: 'Photography',
      };

      await expect(offeringService.createOffering(createOfferingInput)).rejects.toThrow(
        'Vendor not found',
      );
    });
  });

  describe('Find Offerings', () => {
    it('should find an offering by ID', async () => {
      // This test depends on the create test above
      expect(testOfferingId).toBeDefined();
      
      const offering = await offeringService.findOfferingById(testOfferingId);
      expect(offering).toBeDefined();
      expect(offering.id).toBe(testOfferingId);
    });

    it('should return null for non-existent offering ID', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const result = await offeringService.findOfferingById(nonExistentId);
      expect(result).toBeNull();
    });

    it('should find offerings by vendor ID', async () => {
      // This test depends on the create test above
      expect(testVendorId).toBeDefined();
      
      const offerings = await offeringService.findOfferingsByVendor(testVendorId);
      
      expect(Array.isArray(offerings)).toBe(true);
      expect(offerings.length).toBeGreaterThan(0);
      expect(offerings.some(offering => offering.id === testOfferingId)).toBe(true);
      offerings.forEach(offering => {
        expect(offering.vendor.id).toBe(testVendorId);
      });
    });

    it('should find offerings based on category filter', async () => {
      // Create another offering with a specific category for testing
      const specificCategory = `Test-Category-${Date.now()}`;
      const createOfferingInput: CreateOfferingInput = {
        vendor_id: testVendorId,
        name: `Filtered Offering ${Date.now()}`,
        category: specificCategory,
      };
      
      const createdOffering = await offeringService.createOffering(createOfferingInput);
      
      // Test filtering
      const filterInput: OfferingFilterInput = {
        category: specificCategory,
      };
      
      const results = await offeringService.findOfferingsByFilters(filterInput);
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      expect(results.some(offering => offering.id === createdOffering.id)).toBe(true);
      results.forEach(offering => {
        expect(offering.category).toBe(specificCategory);
      });
      
      // Clean up
      await offeringService.deleteOffering(createdOffering.id);
    });

    it('should find offerings based on city filter', async () => {
      const filterInput: OfferingFilterInput = {
        city: 'Test City', // This should match the vendor's city
      };
      
      const results = await offeringService.findOfferingsByFilters(filterInput);
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      results.forEach(offering => {
        expect(offering.vendor.city).toBe('Test City');
      });
    });

    it('should return empty array when no offerings match filters', async () => {
      const filterInput: OfferingFilterInput = {
        category: 'Non-Existent-Category',
        city: 'Non-Existent-City',
      };
      
      const results = await offeringService.findOfferingsByFilters(filterInput);
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBe(0);
    });
  });
  });