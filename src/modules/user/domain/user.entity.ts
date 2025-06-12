import { Role } from 'src/common/decorators/roles.decorator';
import { Profile } from 'src/modules/profile/domain/profile.entity';

export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: Role,
    public profile?: Profile,
  ) {}
}
