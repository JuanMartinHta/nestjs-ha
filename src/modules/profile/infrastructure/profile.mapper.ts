import { Profile } from '../domain/profile.entity';

export class ProfileMapper {
  static toDomain(profileDoc: Record<string, any>): Profile {
    const id = profileDoc._id ? String(profileDoc._id) : String(profileDoc.id);
    return new Profile(
      id,
      String(profileDoc.name),
      String(profileDoc.bio),
      String(profileDoc.userId),
    );
  }

  static toOrm(profile: Profile): any {
    return {
      _id: profile.id,
      name: profile.name,
      bio: profile.bio,
    };
  }
}
