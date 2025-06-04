import { Profile } from '../domain/profile.entity';
import { ProfileOrmEntity } from '../infrastructure/profile.orm-entity';

export class ProfileMapper {
  static toDomain(entity: ProfileOrmEntity): Profile {
    return new Profile(entity.id, entity.name, entity.bio);
  }

  static toOrm(profile: Profile): Partial<ProfileOrmEntity> {
    return {
      id: profile.id,
      name: profile.name,
      bio: profile.bio,
    };
  }
}
