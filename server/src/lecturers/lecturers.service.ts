import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLecturerInput } from './dto/create-lecturer.input';
import { Lecturers } from './entities/lecturers.entity';

@Injectable()
export class LecturersService {
  constructor(
    @InjectRepository(Lecturers)
    private lecturersRepository: Repository<Lecturers>,
  ) {}

  async getOneLecturer(id: number): Promise<Lecturers> {
    return await this.lecturersRepository.findOne(id);
  }

  async getAllLecturers(): Promise<Lecturers[]> {
    return await this.lecturersRepository.find();
  }

  async createLecturer(input: CreateLecturerInput): Promise<Lecturers> {
    const lecturer = this.lecturersRepository.create(input);
    return await this.lecturersRepository.save(lecturer);
  }
}
