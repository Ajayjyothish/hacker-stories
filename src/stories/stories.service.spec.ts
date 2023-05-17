import { Test, TestingModule } from '@nestjs/testing';
import { StoriesService } from './stories.service';
import { Story } from './story.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('StoriesService', () => {
  let service: StoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoriesService,
        { provide: getRepositoryToken(Story), useFactory: jest.fn() },
        { provide: CACHE_MANAGER, useFactory: jest.fn() },
      ],
    }).compile();

    service = module.get<StoriesService>(StoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
