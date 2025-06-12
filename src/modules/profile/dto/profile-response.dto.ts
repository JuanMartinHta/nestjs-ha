import { Profile } from '../domain/profile.entity';

export class ProfileResponseDto {
  id: string;
  name: string;
  bio: string;
  userId: string;

  static fromDomain(profile: Profile): ProfileResponseDto {
    return {
      id: profile.id,
      name: profile.name,
      bio: profile.bio,
      userId: profile.userId,
    };
  }
}
