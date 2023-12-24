import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceHistoryController } from './attendance-history.controller';
import { AttendanceHistoryService } from './attendance-history.service';

describe('AttendanceHistoryController', () => {
  let controller: AttendanceHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AttendanceHistoryController],
      providers: [AttendanceHistoryService],
    }).compile();

    controller = module.get<AttendanceHistoryController>(AttendanceHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
