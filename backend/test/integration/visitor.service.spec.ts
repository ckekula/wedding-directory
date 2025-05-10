import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { VisitorService } from 'src/modules/visitor/visitor.service';
import { VisitorEntity } from 'src/database/entities/visitor.entity';
import { CreateVisitorInput } from 'src/graphql/inputs/createVisitor.input';
import { UpdateVisitorInput } from 'src/graphql/inputs/updateVisitor.input';
import { ChecklistService } from 'src/modules/checklist/checklist.service';
import * as bcrypt from 'bcryptjs';
import { getEntities } from '../../src/database/entities/index';

describe('VisitorService Integration Tests', () => {
  let app: INestApplication;
  let visitorService: VisitorService;
  let testVisitorId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            url: configService.get('TEST_DATABASE_URL'),
            entities: getEntities(), // Use all entities from your application
            synchronize: true, // Only for testing
          }),
        }),
        TypeOrmModule.forFeature([VisitorEntity]),
      ],
      providers: [
        VisitorService,
        {
          provide: ChecklistService,
          useValue: {
            handleWeddingDateChange: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    visitorService = moduleFixture.get<VisitorService>(VisitorService);
  });

  afterAll(async () => {
    // Clean up created test data if testVisitorId was set
    if (testVisitorId) {
      try {
        await visitorService.remove(testVisitorId);
      } catch (e) {
        console.log('Error cleaning up test visitor:', e);
      }
    }
    await app.close();
  });

  // Helper function to compare visitor data
  const compareVisitorData = (visitor: VisitorEntity, inputData) => {
    expect(visitor).toBeDefined();
    expect(visitor.email).toBe(inputData.email);
    expect(visitor.visitor_fname).toBe(inputData.visitor_fname);
    expect(visitor.visitor_lname).toBe(inputData.visitor_lname);
    expect(visitor.partner_fname).toBe(inputData.partner_fname);
    expect(visitor.partner_lname).toBe(inputData.partner_lname);
    expect(visitor.engaged_date).toBe(inputData.engaged_date);
    expect(visitor.wed_date).toBe(inputData.wed_date);
    expect(visitor.wed_venue).toBe(inputData.wed_venue);
    expect(visitor.phone).toBe(inputData.phone);
    expect(visitor.city).toBe(inputData.city);
    // Don't compare passwords directly
  };

  const verifyPasswordHash = async (plainPassword: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    expect(isMatch).toBe(true);
  };

  describe('Create Visitor', () => {
    it('should create a new visitor in the database', async () => {
      const createVisitorInput: CreateVisitorInput = {
        email: `test_${Date.now()}@example.com`, // Use timestamp to ensure uniqueness
        password: 'TestPassword123!',
        visitor_fname: 'Integration',
        visitor_lname: 'Test',
        partner_fname: 'Partner',
        partner_lname: 'Test',
        engaged_date: '2023-05-01',
        wed_date: '2024-10-15',
        wed_venue: 'Test Venue',
        phone: '1234567890',
        city: 'Test City',
      };

      const result = await visitorService.create(createVisitorInput);
      
      // Save the created visitor ID for cleanup
      testVisitorId = result.id;
      
      // Verify the visitor was created with correct data
      compareVisitorData(result, createVisitorInput);
      
      // Verify password was hashed
      await verifyPasswordHash(createVisitorInput.password, result.password);
    });
  });

  describe('Find Visitors', () => {
    it('should find a visitor by ID', async () => {
      // This test depends on the create test above
      expect(testVisitorId).toBeDefined();
      
      const visitor = await visitorService.findVisitorById(testVisitorId);
      expect(visitor).toBeDefined();
      expect(visitor.id).toBe(testVisitorId);
    });

    it('should find a visitor by email', async () => {
      // Create a unique visitor for this test
      const email = `email_lookup_${Date.now()}@example.com`;
      const createVisitorInput: CreateVisitorInput = {
        email,
        password: 'TestPassword123!',
        visitor_fname: 'Email',
        visitor_lname: 'Lookup',
        partner_fname: 'Partner',
        partner_lname: 'Email',
        engaged_date: '2023-06-01',
        wed_date: '2024-11-20',
        wed_venue: 'Email Venue',
        phone: '9876543210',
        city: 'Email City',
      };

      const createdVisitor = await visitorService.create(createVisitorInput);
      
      // Find by email
      const foundVisitor = await visitorService.getVisitorByEmail(email);
      
      expect(foundVisitor).toBeDefined();
      expect(foundVisitor.email).toBe(email);
      
      // Clean up
      await visitorService.remove(createdVisitor.id);
    });

    it('should return null when finding non-existent visitor', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const visitor = await visitorService.findVisitorById(nonExistentId);
      expect(visitor).toBeNull();
    });

    it('should find all visitors', async () => {
      const visitors = await visitorService.findAllVisitors();
      expect(Array.isArray(visitors)).toBe(true);
    });
  });

  describe('Update Visitor', () => {
    it('should update visitor information', async () => {
      // This test depends on the create test above
      expect(testVisitorId).toBeDefined();
      
      const updateVisitorInput: UpdateVisitorInput = {
        visitor_fname: 'Updated',
        visitor_lname: 'Name',
        partner_fname: 'Updated Partner',
        city: 'New City',
      };
      
      const updatedVisitor = await visitorService.updateVisitor(testVisitorId, updateVisitorInput);
      
      expect(updatedVisitor).toBeDefined();
      expect(updatedVisitor.visitor_fname).toBe(updateVisitorInput.visitor_fname);
      expect(updatedVisitor.visitor_lname).toBe(updateVisitorInput.visitor_lname);
      expect(updatedVisitor.partner_fname).toBe(updateVisitorInput.partner_fname);
      expect(updatedVisitor.city).toBe(updateVisitorInput.city);
    });

    it('should update password with proper hashing', async () => {
      // This test depends on the create test above
      expect(testVisitorId).toBeDefined();
      
      const newPassword = 'NewSecurePassword456!';
      const updateVisitorInput: UpdateVisitorInput = {
        password: newPassword,
      };
      
      const updatedVisitor = await visitorService.updateVisitor(testVisitorId, updateVisitorInput);
      
      expect(updatedVisitor).toBeDefined();
      await verifyPasswordHash(newPassword, updatedVisitor.password);
    });
  });

  describe('Profile Picture Updates', () => {
    it('should update profile picture URL', async () => {
      // This test depends on the create test above
      expect(testVisitorId).toBeDefined();
      
      const fileUrl = 'https://example.com/profile_pictures/test.jpg';
      
      const updatedVisitor = await visitorService.updateProfilePicture(testVisitorId, fileUrl);
      
      expect(updatedVisitor).toBeDefined();
      expect(updatedVisitor.profile_pic_url).toBe(fileUrl);
    });

    it('should throw an error when updating profile for non-existent visitor', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const fileUrl = 'https://example.com/profile_pictures/nonexistent.jpg';
      
      await expect(
        visitorService.updateProfilePicture(nonExistentId, fileUrl)
      ).rejects.toThrow('Visitor not found');
    });
  });

  describe('Wedding Date Updates', () => {
    it('should update the wedding date', async () => {
      // This test depends on the create test above
      expect(testVisitorId).toBeDefined();
      
      const weddingDate = new Date('2025-06-15');
      
      const updatedVisitor = await visitorService.setWeddingDate(testVisitorId, weddingDate);
      
      expect(updatedVisitor).toBeDefined();
      expect(updatedVisitor.weddingDate).toEqual(weddingDate);
    });

    it('should throw an error when updating wedding date for non-existent visitor', async () => {
      const nonExistentId = '00000000-0000-0000-0000-000000000000';
      const weddingDate = new Date('2025-07-30');
      
      await expect(
        visitorService.setWeddingDate(nonExistentId, weddingDate)
      ).rejects.toThrow(`Visitor with ID ${nonExistentId} not found`);
    });
  });

  describe('Delete Visitor', () => {
    it('should delete a visitor from the database', async () => {
      // Create a visitor specifically for deletion test
      const email = `delete_test_${Date.now()}@example.com`;
      const createVisitorInput: CreateVisitorInput = {
        email,
        password: 'DeleteTest123!',
        visitor_fname: 'Delete',
        visitor_lname: 'Test',
        partner_fname: 'Delete',
        partner_lname: 'Partner',
        engaged_date: '2023-03-15',
        wed_date: '2024-08-01',
        wed_venue: 'Delete Venue',
        phone: '5555555555',
        city: 'Delete City',
      };
      
      const createdVisitor = await visitorService.create(createVisitorInput);
      expect(createdVisitor).toBeDefined();
      
      // Delete the visitor
      await visitorService.remove(createdVisitor.id);
      
      // Verify it was deleted
      const findResult = await visitorService.findVisitorById(createdVisitor.id);
      expect(findResult).toBeNull();
    });
  });
});