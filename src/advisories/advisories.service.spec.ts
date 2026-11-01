import { Test, TestingModule } from '@nestjs/testing';
import { AdvisoriesService } from './advisories.service';

describe('AdvisoriesService', () => {
  let service: AdvisoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvisoriesService],
    }).compile();

    service = module.get<AdvisoriesService>(AdvisoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
