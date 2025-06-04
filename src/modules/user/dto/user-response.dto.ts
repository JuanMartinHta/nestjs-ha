import { User } from '../domain/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  role: string;
  profileId?: string;
  profile?: {
    id: string;
    name: string;
    bio: string;
  };

  static fromDomain(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      profileId: user.profileId,
      profile: user.profile
        ? {
            id: user.profile.id,
            name: user.profile.name,
            bio: user.profile.bio,
          }
        : undefined,
    };
  }
}
