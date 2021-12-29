import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../users/entities/role.enum';
import { CreateScheduleTicketInput } from './dto/create-schedule-ticket.input';
import { ScheduleTicketBetweenInput } from './dto/schedule-ticket-between.input';
import { ScheduleTicketInput } from './dto/schedule-ticket.input';
import { ScheduleTicket } from './entities/schedule-ticket';
import { ScheduleTicketsService } from './schedule-tickets.service';

@Resolver((of) => ScheduleTicket)
export class ScheduleTicketsResolver {
  constructor(
    private readonly scheduleTicketsService: ScheduleTicketsService,
  ) {}

  @Query((returns) => [ScheduleTicket], { name: 'scheduleTicketsWeek' })
  scheduleTicketsWeek(
    @Args('input') input: ScheduleTicketBetweenInput,
  ): Promise<ScheduleTicket[]> {
    return this.scheduleTicketsService.findBetween(input);
  }

  @Query((returns) => [ScheduleTicket], { name: 'scheduleTickets' })
  scheduleTickets(
    @Args('input') input: ScheduleTicketInput,
  ): Promise<ScheduleTicket[]> {
    return this.scheduleTicketsService.findAll(input);
  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation((returns) => ScheduleTicket, { name: 'createScheduleTickets' })
  createScheduleTickets(
    @Args('input') input: CreateScheduleTicketInput,
  ): Promise<ScheduleTicket> {
    return this.scheduleTicketsService.create(input);
  }
}
