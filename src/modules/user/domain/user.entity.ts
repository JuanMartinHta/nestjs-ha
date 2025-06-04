import { Role } from 'src/common/decorators/roles.decorator';
import { ProfileOrmEntity } from '../../profile/infrastructure/profile.orm-entity';

export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: Role,
    public profileId?: string,
    public profile?: ProfileOrmEntity, // Se especifica el tipo del perfil
  ) {}
}
