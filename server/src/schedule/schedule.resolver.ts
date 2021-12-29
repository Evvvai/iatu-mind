import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ScheduleService } from './schedule.service';
import { Schedule } from './entities/schedule.entity';
import { GroupDayScheduleInput } from './dto/group-day-schedule.input';
import { GroupScheduleInput } from './dto/group-schedule.input';

@Resolver(() => Schedule)
export class ScheduleResolver {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Query(() => [Schedule], { name: 'day' })
  findOne(@Args('input') input: GroupDayScheduleInput) {
    return this.scheduleService.timetableDay(input);
  }

  @Query(() => [Schedule], { name: 'week' })
  findAll(@Args('input') input: GroupDayScheduleInput) {
    return this.scheduleService.timetableWeek(input);
  }

  @Query(() => [Schedule], { name: 'next' })
  findNext(@Args('input') input: GroupScheduleInput) {
    return this.scheduleService.nextPair(input);
  }

  @Query(() => [Schedule], { name: 'now' })
  findNow(@Args('input') input: GroupScheduleInput) {
    return this.scheduleService.nowPair(input);
  }
}
