import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupsDisciplinesService } from 'src/groups-disciplines/groups-disciplines.service';
import { Like, Repository } from 'typeorm';
import { DisciplineInput } from './dto/discipline.input';
import { FindAvailableDisciplineInput } from './dto/find-available-discipline.input';
import { Discipline } from './entities/discipline.entity';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectRepository(Discipline)
    private disciplineRepository: Repository<Discipline>,

    @Inject(forwardRef(() => GroupsDisciplinesService))
    private groupsDisciplinesService: GroupsDisciplinesService,
  ) {}

  async findAll(input: DisciplineInput): Promise<Discipline[]> {
    return await this.disciplineRepository.find({
      where: {
        name: Like('%' + input.term + '%'),
      },
    });
  }

  async findOneByGroup(): Promise<Discipline[]> {
    return await this.disciplineRepository.find();
  }

  // Available
  async findAvailable(
    input: FindAvailableDisciplineInput,
  ): Promise<Discipline[]> {
    const groupDiscipline =
      await this.groupsDisciplinesService.getAllDisciplines(input);

    return (await groupDiscipline.length) === 0
      ? this.disciplineRepository
          .createQueryBuilder('group')
          .where('group.actually = 1')
          .getMany()
      : this.disciplineRepository
          .createQueryBuilder('group')
          .where('group.id NOT IN(:...ids)', {
            ids: groupDiscipline?.map((x) => {
              return x?.disciplineId;
            }),
          })
          .andWhere('group.actually = 1')
          .getMany();
  }

  findOne(id: number) {
    return this.disciplineRepository.findOneOrFail(id);
  }
}
