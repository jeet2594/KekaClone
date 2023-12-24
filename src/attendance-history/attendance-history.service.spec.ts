import { Test, TestingModule } from '@nestjs/testing';
import { AttendanceHistoryService } from './attendance-history.service';

describe('AttendanceHistoryService', () => {
  let service: AttendanceHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AttendanceHistoryService],
    }).compile();

    service = module.get<AttendanceHistoryService>(AttendanceHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
