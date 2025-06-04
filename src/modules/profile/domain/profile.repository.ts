import { Profile } from './profile.entity';

export interface ProfileRepository {
  create(profile: Profile): Promise<Profile>;
  update(id: string, profile: Partial<Profile>): Promise<Profile>;
  delete(id: string): Promise<void>;
}
