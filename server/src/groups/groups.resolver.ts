import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../users/entities/role.enum';
import { Faculty } from '../faculties/entities/faculty.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { Group } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Resolver((of) => Group)
export class GroupsResolver {
  constructor(private groupsService: GroupsService) {}

  @Query((returns) => [Group])
  groups(): Promise<Group[]> {
    return this.groupsService.getAll();
  }

  @Roles(Role.ADMIN, Role.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Mutation((returns) => Group)
  createGroup(
    @Args('createGroupInput') createGroupInput: CreateGroupInput,
  ): Promise<Group> {
    return this.groupsService.createGroup(createGroupInput);
  }

  // Resolve
  @ResolveField((returns) => Faculty)
  faculty(@Parent() group: Group): Promise<Faculty> {
    return this.groupsService.getOne(group.facultyId);
  }
}
