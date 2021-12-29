import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskCompleteInput } from './dto/create-task-complete.input';
import { UpdateTaskCompleteInput } from './dto/update-task-complete.input';
import { TaskComplete } from './entities/task-complete.entity';
import { TaskStatus } from './entities/task-status.enum';

@Injectable()
export class TaskCompletesService {
  constructor(
    @InjectRepository(TaskComplete)
    private taskCompletesRepository: Repository<TaskComplete>,
  ) {}

  async create(createTaskCompleteInput: CreateTaskCompleteInput) {
    const status = await this.taskCompletesRepository.create(
      createTaskCompleteInput,
    );

    return await this.taskCompletesRepository.save(status);
  }

  async findAll() {
    return `This action returns all taskCompletes`;
  }

  async findOne(disciplineTaskId: number, userId: number) {
    let status = await this.taskCompletesRepository.findOne({
      where: {
        disciplineTaskId,
        userId,
      },
    });

    if (!status) {
      status = new TaskComplete();
      status.status = TaskStatus.NONE;
    }

    return status;
  }

  async update(updateTaskCompleteInput: UpdateTaskCompleteInput) {
    const status = await this.taskCompletesRepository.findOne(
      updateTaskCompleteInput.id,
    );
    status.status = updateTaskCompleteInput.status;

    return await this.taskCompletesRepository.save(status);
  }

  async remove(id: number) {
    return `This action removes a #${id} taskComplete`;
  }
}
