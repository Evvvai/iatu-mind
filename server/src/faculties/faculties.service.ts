import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { Faculty } from './entities/faculty.entity';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty) private facultiesRepository: Repository<Faculty>,
  ) {}

  async findAll(): Promise<Faculty[]> {
    return this.facultiesRepository.find();
  }

  findOne(id: number) {
    return this.facultiesRepository.findOneOrFail(id);
  }
}
