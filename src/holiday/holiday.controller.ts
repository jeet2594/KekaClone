import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HolidayService } from './holiday.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { UpdateHolidayDto } from './dto/update-holiday.dto';

@Controller('holiday')
export class HolidayController {
  constructor(private readonly holidayService: HolidayService) {}

  @Post()
  async create(@Body() createHolidayDto: CreateHolidayDto) {
    try {
      await this.holidayService.create(createHolidayDto);
      return { status: true, message: 'Holiday Created!' };
    } catch (error) {
      return { status: false, message: error.message };
    }
  }

  @Get()
  async findAll() {
    try {
      const holidays = await this.holidayService.findAll();
      return { status: 1, message: 'Success', holidays: holidays };
    } catch (error) {
      return { status: 0, message: 'Something went wrong!!' };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const holidays = await this.holidayService.findOne(+id);
      return { status: 1, message: 'success', details: holidays };
    } catch (error) {
      return { status: 0, message: 'Something went wrong!' };
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHolidayDto: UpdateHolidayDto) {
    try {
      console.log('holidaydata', updateHolidayDto);
      const holiday = this.holidayService.update(+id, updateHolidayDto);
      if (holiday) {
        return { status: 1, message: 'success' };
      } else {
        return { status: 0, message: 'Something went wrong!' };
      }
    } catch (error) {
      return { status: 0, message: 'Something went wrong!' };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.holidayService.remove(+id);
      return { status: 1, message: 'Holiday Deleted Successfully!' };
    } catch (error) {
      return { status: 0, message: error.message };
    }
  }
}
