import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateScheduleTicketInput } from './dto/create-schedule-ticket.input';
import { ScheduleTicketBetweenInput } from './dto/schedule-ticket-between.input';
import { ScheduleTicketInput } from './dto/schedule-ticket.input';
import { ScheduleTicket } from './entities/schedule-ticket';

@Injectable()
export class ScheduleTicketsService {
  constructor(
    @InjectRepository(ScheduleTicket)
    private scheduleTicketsRepository: Repository<ScheduleTicket>,
  ) {}

  findBetween(input: ScheduleTicketBetweenInput): Promise<ScheduleTicket[]> {
    return this.scheduleTicketsRepository.find({
      where: {
        groupId: input.groupId,
        dateAdd: Between(input.dateFirst, input.dateLast),
      },
    });
  }

  findAll(input: ScheduleTicketInput): Promise<ScheduleTicket[]> {
    return this.scheduleTicketsRepository.find({
      where: {
        groupId: input.groupId,
        dateAdd: input.dateAdd,
      },
    });
  }

  create(input: CreateScheduleTicketInput): Promise<ScheduleTicket> {
    const scheduleTicket = this.scheduleTicketsRepository.create(input);
    return this.scheduleTicketsRepository.save(scheduleTicket);
  }
}
