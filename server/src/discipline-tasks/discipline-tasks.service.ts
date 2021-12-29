import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDisciplineTaskInput } from './dto/create-discipline-task.input';
import { UpdateDisciplineTaskInput } from './dto/update-discipline-task.input';
import { DisciplineTask } from './entities/discipline-task.entity';

@Injectable()
export class DisciplineTasksService {
  constructor(
    @InjectRepository(DisciplineTask)
    private disciplineTaskRepository: Repository<DisciplineTask>,
  ) {}

  async create(input: CreateDisciplineTaskInput): Promise<DisciplineTask> {
    const disciplineTask = this.disciplineTaskRepository.create(input);

    return await this.disciplineTaskRepository.save(disciplineTask);
  }

  async findAll(groupDisciplineId: number): Promise<DisciplineTask[]> {
    return await this.disciplineTaskRepository.find({
      where: {
        groupDisciplineId,
      },
      order: {
        index: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} disciplineTask`;
  }

  async update(
    id: number,
    updateDisciplineTaskInput: UpdateDisciplineTaskInput,
  ) {
    return `This action updates a #${id} disciplineTask`;
  }

  async remove(id: number): Promise<DisciplineTask> {
    const disciplineTask = await this.disciplineTaskRepository.findOne(id);
    if (disciplineTask) this.disciplineTaskRepository.remove(disciplineTask);

    return disciplineTask;
  }
}
