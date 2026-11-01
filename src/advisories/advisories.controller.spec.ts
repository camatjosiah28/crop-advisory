import { Test, TestingModule } from '@nestjs/testing';
import { AdvisoriesController } from './advisories.controller';

describe('AdvisoriesController', () => {
  let controller: AdvisoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdvisoriesController],
    }).compile();

    controller = module.get<AdvisoriesController>(AdvisoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
