import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { OfferingService } from 'src/modules/offering/offering.service';
import { VendorService } from 'src/modules/vendor/vendor.service';
import { OfferingEntity } from 'src/database/entities/offering.entity';
import { VendorEntity } from 'src/database/entities/vendor.entity';
import { CreateOfferingInput } from 'src/graphql/inputs/createOffering.input';
import { getEntities } from '../../src/database/entities/index';
import { of } from 'rxjs';
import { UpdateOfferingInput } from 'src/graphql/inputs/updateOffering.input';

describe('OfferingService Integration Tests', () => {
  let app: INestApplication;
  let offeringService: OfferingService;
  let vendorService: VendorService;
  let httpService: HttpService;
  let testOfferingId: string;
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
        TypeOrmModule.forFeature([OfferingEntity, VendorEntity]),
      ],
      providers: [OfferingService, VendorService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    offeringService = moduleFixture.get<OfferingService>(OfferingService);
    vendorService = moduleFixture.get<VendorService>(VendorService);
    httpService = moduleFixture.get<HttpService>(HttpService);

    // Mock HTTP requests if needed
    jest
      .spyOn(httpService, 'request')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .mockImplementation(() => of({ data: {} } as any));
  });

  afterAll(async () => {
    if (testOfferingId) {
      try {
        await offeringService.deleteOffering(testOfferingId);
      } catch (e) {
        console.log('Error cleaning up test offering:', e);
      }
    }
    if (testVendorId) {
      try {
        await vendorService.deleteVendor(testVendorId);
      } catch (e) {
        console.log('Error cleaning up test vendor:', e);
      }
    }
    await app.close();
  });

  describe('Setup Test Vendor', () => {
    it('should create a test vendor', async () => {
      const vendor = await vendorService.createVendor({
        email: `testvendor_${Date.now()}@example.com`,
        password: 'TestVendor123!',
        fname: 'Integration',
        lname: 'Test',
        busname: 'Test Business',
        phone: '1234567890',
        city: 'Test City',
        location: 'Test Location',
      });

      testVendorId = vendor.id;
      expect(vendor).toBeDefined();
    });
  });

  describe('Create Offering', () => {
    it('should create a new offering in the database', async () => {
      const createOfferingInput: CreateOfferingInput = {
        vendor_id: testVendorId,
        name: 'Test Offering',
        category: 'Test Category',
      };

      const result = await offeringService.createOffering(createOfferingInput);
      testOfferingId = result.id;

      expect(result).toBeDefined();
      expect(result.name).toBe(createOfferingInput.name);
      expect(result.category).toBe(createOfferingInput.category);
      expect(result.vendor.id).toBe(testVendorId);
    });
  });

  describe('Find Offerings', () => {
    it('should find an offering by ID', async () => {
      expect(testOfferingId).toBeDefined();

      const offering = await offeringService.findOfferingById(testOfferingId);
      expect(offering).toBeDefined();
      expect(offering.id).toBe(testOfferingId);
    });

    it('should find offerings by vendor', async () => {
      expect(testVendorId).toBeDefined();

      const offerings =
        await offeringService.findOfferingsByVendor(testVendorId);
      expect(Array.isArray(offerings)).toBe(true);
      expect(offerings.length).toBeGreaterThan(0);
      expect(offerings[0].vendor.id).toBe(testVendorId);
    });

    it('should return null when finding non-existent offering', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const offering = await offeringService.findOfferingById(nonExistentId);
      expect(offering).toBeNull();
    });
  });

  describe('Update Offering', () => {
    it('should update offering information', async () => {
      expect(testOfferingId).toBeDefined();

      const updateOfferingInput: UpdateOfferingInput = {
        description: 'Updated description for testing',
        website: 'https://updated-test.com',
        visible: true,
        banner: 'https://example.com/updated-banner.jpg',
        photo_showcase: [
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
        ],
        video_showcase: [
          'https://example.com/video1.mp4',
          'https://example.com/video2.mp4',
        ],
      };

      const updatedOffering = await offeringService.updateOffering(
        testOfferingId,
        updateOfferingInput,
      );

      expect(updatedOffering).toBeDefined();
      expect(updatedOffering.description).toBe(updateOfferingInput.description);
      expect(updatedOffering.website).toBe(updateOfferingInput.website);
      expect(updatedOffering.visible).toBe(updateOfferingInput.visible);
    });

    it('should update offering banner', async () => {
      expect(testOfferingId).toBeDefined();

      const bannerUrl = 'https://example.com/banners/test.jpg';
      const updatedOffering = await offeringService.updateOfferingBanner(
        testOfferingId,
        bannerUrl,
      );

      expect(updatedOffering).toBeDefined();
      expect(updatedOffering.banner).toBe(bannerUrl);
    });
  });

  describe('Delete Offering', () => {
    it('should delete an offering from the database', async () => {
      // Create a separate offering for deletion test
      const createOfferingInput: CreateOfferingInput = {
        vendor_id: testVendorId,
        name: 'Delete Test Offering',
        category: 'Test Category',
      };

      const offering =
        await offeringService.createOffering(createOfferingInput);
      expect(offering).toBeDefined();

      // Delete the offering
      const deleteResult = await offeringService.deleteOffering(offering.id);
      expect(deleteResult).toBe(true);

      // Verify it was deleted
      const findResult = await offeringService.findOfferingById(offering.id);
      expect(findResult).toBeNull();
    });
  });
});
