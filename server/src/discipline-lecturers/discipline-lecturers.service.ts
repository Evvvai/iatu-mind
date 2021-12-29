import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDisciplineLecturerInput } from './dto/create-discipline-lecturer.input';
import { DeleteDisciplineLecturerInput } from './dto/delete-discipline-lecturer.input';
import { DisciplineLecturers } from './entities/discipline-lecturers.entity';

@Injectable()
export class DisciplineLecturersService {
  constructor(
    @InjectRepository(DisciplineLecturers)
    private disciplineLecturersRepository: Repository<DisciplineLecturers>, // private lecturersService: LecturersService,
  ) {}

  async createDisciplineLecturer(
    input: CreateDisciplineLecturerInput,
  ): Promise<DisciplineLecturers> {
    const lecturer = await this.disciplineLecturersRepository.create(input);
    return this.disciplineLecturersRepository.save(lecturer);
  }

  async removeDisciplineLecturer(
    input: DeleteDisciplineLecturerInput,
  ): Promise<DisciplineLecturers> {
    const lecturer = await this.disciplineLecturersRepository.findOne({
      where: {
        lecturerId: input.lecturerId,
        groupDisciplineId: input.groupDisciplineId,
        role: input.role,
      },
    });
    this.disciplineLecturersRepository.remove(lecturer);

    return lecturer;
  }

  async getDisciplineLecturers(id: number): Promise<DisciplineLecturers[]> {
    return await this.disciplineLecturersRepository.find({
      where: { groupDisciplineId: id },
    });
  }
}
