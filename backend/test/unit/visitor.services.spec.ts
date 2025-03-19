import { Test, TestingModule } from '@nestjs/testing';
import { VisitorService } from '../../src/modules/visitor/visitor.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { VisitorEntity } from '../../src/database/entities/visitor.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateVisitorInput } from '../../src/graphql/inputs/createVisitor.input';
import { UpdateVisitorInput } from '../../src/graphql/inputs/updateVisitor.input';

describe('VisitorService', () => {
  let service: VisitorService;
  let repository: Repository<VisitorEntity>;

  const mockVisitor: VisitorEntity = {
    id: '1',
    email: 'test@example.com',
    password: 'hashedpassword',
    visitor_fname: 'John',
    visitor_lname: 'Doe',
    partner_fname: null,
    partner_lname: null,
    engaged_date: null,
    wed_date: null,
    wed_venue: null,
    phone: null,
    city: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [],
    myVendors: [],
    guestlist: [],
    checklists: [],
    profile_pic_url: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VisitorService,
        {
          provide: getRepositoryToken(VisitorEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<VisitorService>(VisitorService);
    repository = module.get<Repository<VisitorEntity>>(
      getRepositoryToken(VisitorEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a visitor', async () => {
    const createInput: CreateVisitorInput = {
      email: 'test@example.com',
      password: 'plainpassword',
    };
    jest.spyOn(bcrypt, 'hashSync').mockReturnValue('hashedpassword');
    jest.spyOn(repository, 'create').mockReturnValue(mockVisitor);
    jest.spyOn(repository, 'save').mockResolvedValue(mockVisitor);

    const result = await service.create(createInput);
    expect(result).toEqual(mockVisitor);
    expect(bcrypt.hashSync).toHaveBeenCalledWith('plainpassword', 12);
  });

  it('should find all visitors', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([mockVisitor]);
    const result = await service.findAllVisitors();
    expect(result).toEqual([mockVisitor]);
  });

  it('should find a visitor by ID', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockVisitor);
    const result = await service.findVisitorById('1');
    expect(result).toEqual(mockVisitor);
  });

  it('should update a visitor', async () => {
    const updateInput: UpdateVisitorInput = { email: 'updated@example.com' };
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue({ ...mockVisitor, ...updateInput });

    const result = await service.updateVisitor('1', updateInput);
    expect(result.email).toBe('updated@example.com');
  });

  it('should remove a visitor', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
    await expect(service.remove('1')).resolves.toBeUndefined();
  });
});
