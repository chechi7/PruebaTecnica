import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { TypeOrmUserRepository } from '../../infrastructure/persistence/repositories/typeorm-user.repository';

describe('UserService', () => {
  let service: UserService;
  let repository: TypeOrmUserRepository;
  const mockUserRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: TypeOrmUserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<TypeOrmUserRepository>(TypeOrmUserRepository);
  });

  it('debe estar definido', () => {
    expect(service).toBeDefined();
  });

  it('debe crear un usuario exitosamente', async () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const expectedUser = { id: 'uuid-123', ...userData };
    
    mockUserRepository.create.mockResolvedValue(expectedUser);

    const result = await service.create(userData.name, userData.email);

    expect(result).toEqual(expectedUser);
    expect(mockUserRepository.create).toHaveBeenCalledWith(userData.name, userData.email);
  });
});