import { Module } from '@nestjs/common';
import { TimetableService } from './timetable.service';
import { TimetableController } from './timetable.controller';
import { ScheduleTicketsModule } from 'src/schedule-tickets/schedule-tickets.module';

@Module({
  imports: [ScheduleTicketsModule],
  controllers: [TimetableController],
  providers: [TimetableService],
})
export class TimetableModule {}
