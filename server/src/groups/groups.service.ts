import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faculty } from '../faculties/entities/faculty.entity';
import { FacultiesService } from '../faculties/faculties.service';
import { Repository } from 'typeorm';
import { CreateGroupInput } from './dto/create-group.input';
import { Group } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private groupsRepository: Repository<Group>,
    private facultiesService: FacultiesService,
  ) {}

  createGroup(createGroupInput: CreateGroupInput): Promise<Group> {
    const newGroup = this.groupsRepository.create(createGroupInput);
    return this.groupsRepository.save(newGroup);
  }

  async getAll(): Promise<Group[]> {
    return this.groupsRepository.find();
  }

  // Resolve
  async getOne(groupId: number): Promise<Faculty> {
    return this.facultiesService.findOne(groupId);
  }
}
