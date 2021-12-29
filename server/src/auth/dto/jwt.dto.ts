import { Role } from 'src/users/entities/role.enum';

export class JwtDto {
  userId: number;
  role: Role;
}
