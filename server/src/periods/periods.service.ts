import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Period } from './entities/period.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PeriodsService {
  constructor(
    @InjectRepository(Period) private periodsRepository: Repository<Period>,
  ) {}

  async getAll(): Promise<Period[]> {
    return this.periodsRepository.find();
  }

  getOne(id: number) {
    return this.periodsRepository.findOneOrFail(id);
  }
}
