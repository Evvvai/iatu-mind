import { Module } from '@nestjs/common';
import { PeriodsService } from './periods.service';
import { PeriodsResolver } from './periods.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Period } from './entities/period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Period])],
  providers: [PeriodsResolver, PeriodsService],
  exports: [PeriodsService],
})
export class PeriodsModule {}
