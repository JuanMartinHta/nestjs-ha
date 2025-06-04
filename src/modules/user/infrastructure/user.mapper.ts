import { Role } from 'src/common/decorators/roles.decorator';
import { User } from '../domain/user.entity';
import { UserOrmEntity } from '../infrastructure/user.orm-entity';
import { Profile } from 'src/modules/profile/domain/profile.entity';

export class UserMapper {
  static toDomain(userOrm: UserOrmEntity): User {
    const profile = userOrm.profile
      ? new Profile(
          userOrm.profile.id,
          userOrm.profile.name,
          userOrm.profile.bio,
        )
      : undefined;
    return new User(
      userOrm.id,
      userOrm.email,
      userOrm.password,
      userOrm.role as Role,
      userOrm.profileId,
      profile,
    );
  }

  static toOrm(user: User): Partial<UserOrmEntity> {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
      profileId: user.profileId,
    };
  }
}
