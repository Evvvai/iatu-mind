import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DisciplinesService } from '../disciplines/disciplines.service';
import { Repository } from 'typeorm';
import { CreateGroupDisciplines } from './dto/create-group-disciplines.input';
import { DefaultGroupDisciplinesInput } from './dto/default-disciplines.input';
import { GetAllGroupDisciplinesInput } from './dto/get-all-group-disciplines.input';
import { GroupDiscipline } from './entities/group-discipline.entity';
import { Discipline } from '../disciplines/entities/discipline.entity';

@Injectable()
export class GroupsDisciplinesService {
  constructor(
    @InjectRepository(GroupDiscipline)
    private groupsDisciplinesRepository: Repository<GroupDiscipline>,

    @Inject(forwardRef(() => DisciplinesService))
    private disciplinesService: DisciplinesService,
  ) {}

  async getAllDisciplines(
    input: GetAllGroupDisciplinesInput,
  ): Promise<GroupDiscipline[]> {
    return this.groupsDisciplinesRepository.find({
      where: {
        groupId: input.groupId,
        periodId: input.periodId,
      },
    });
  }

  async create(input: CreateGroupDisciplines): Promise<GroupDiscipline> {
    const groupDisciplie = this.groupsDisciplinesRepository.create(input);
    this.groupsDisciplinesRepository.save(groupDisciplie);

    return groupDisciplie;
  }

  async getExist(
    input: DefaultGroupDisciplinesInput,
  ): Promise<GroupDiscipline[]> {
    return this.groupsDisciplinesRepository.find({
      where: { periodId: input.periodId, groupId: input.groupId },
    });
  }

  async getExtend(
    input: DefaultGroupDisciplinesInput,
  ): Promise<GroupDiscipline> {
    return await this.groupsDisciplinesRepository.findOne({
      where: {
        periodId: input.periodId,
        groupId: input.groupId,
        disciplineId: input.disciplineId,
      },
    });
  }

  // Resolve;
  async getOneDiscipline(id: number): Promise<Discipline> {
    return this.disciplinesService.findOne(id);
  }
}
