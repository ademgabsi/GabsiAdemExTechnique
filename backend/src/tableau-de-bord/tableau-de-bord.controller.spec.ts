import { Test, TestingModule } from '@nestjs/testing';
import { TableauDeBordController } from './tableau-de-bord.controller';

describe('TableauDeBordController', () => {
  let controller: TableauDeBordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableauDeBordController],
    }).compile();

    controller = module.get<TableauDeBordController>(TableauDeBordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
