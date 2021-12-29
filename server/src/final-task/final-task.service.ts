import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { FinalTask } from './entities/final-task.entity';

@Injectable()
export class FinalTaskService {
  constructor(
    @InjectRepository(FinalTask)
    private finalTaskRepository: Repository<FinalTask>,
  ) {}

  async findAll(): Promise<FinalTask[]> {
    return this.finalTaskRepository.find();
  }

  async getOneFinalTask(id: number): Promise<FinalTask> {
    return this.finalTaskRepository.findOne(id);
  }
}
