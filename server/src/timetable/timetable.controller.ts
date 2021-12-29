import { Controller, Get, Param, Query } from '@nestjs/common';
import { TimetableService } from './timetable.service';

@Controller('api/timetable')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Get('/day')
  findOne(@Query('group') group: string, @Query('day') day: string) {
    return this.timetableService.timetableWeek(group, day);
  }

  @Get('/week')
  findAll(@Query('group') group: string, @Query('day') day: string) {
    return this.timetableService.timetableWeek(group, day);
  }

  @Get('/next')
  findNext(@Query('group') group: string) {
    return this.timetableService.nextPair(group);
  }

  @Get('/now')
  findBefore(@Query('group') group: string) {
    return this.timetableService.nowPair(group);
  }
}
