import { Module } from '@nestjs/common';
import { ScheduleTicketsService } from './schedule-tickets.service';
import { ScheduleTicketsResolver } from './schedule-tickets.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleTicket } from './entities/schedule-ticket';

@Module({
  imports: [TypeOrmModule.forFeature([ScheduleTicket])],
  providers: [ScheduleTicketsResolver, ScheduleTicketsService],
  exports: [ScheduleTicketsService],
})
export class ScheduleTicketsModule {}
