import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';
import { Holiday } from './entities/holiday.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private holidayRepository: Repository<Holiday>,
  ) {}

  async create(createHolidayDto: CreateHolidayDto) {
    try {
      const holiday = this.holidayRepository.create(createHolidayDto);
      const newHoliday = this.holidayRepository.save(holiday);
      if (!newHoliday) {
        throw new InternalServerErrorException('Failed to create user');
      }
      console.log('=== create newHoliday', newHoliday);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll(): Promise<Holiday[]> {
    return this.holidayRepository.find();
  }

  async findByStartEnd(startDate: any, endDate: any) {
    return await this.holidayRepository.find({
      where: {
        date: Between(startDate, endDate),
      },
    });
  }

  async findOne(id: number) {
    return await this.holidayRepository.findOne({ where: { id } });
  }

  async update(id: number, updateHolidayDto: UpdateHolidayDto) {
    return await this.holidayRepository.update(id, updateHolidayDto);
  }

  async remove(id: number) {
    return await this.holidayRepository.delete(id);
  }
}
