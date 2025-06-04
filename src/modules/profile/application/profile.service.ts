import { Injectable, Inject } from '@nestjs/common';
import { ProfileRepository } from '../domain/profile.repository';
import { Profile } from '../domain/profile.entity';
import { v4 as uuidv4 } from 'uuid';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import { CreateProfileDto } from '../dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('ProfileRepository')
    private readonly profileRepository: ProfileRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateProfileDto) {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) throw new Error('User not found');

    const profile = new Profile(uuidv4(), dto.name, dto.bio);
    const profileSaved = this.profileRepository.create(profile);

    await this.userRepository.update(user.id, { profileId: profile.id });

    return profileSaved;
  }

  update(id: string, dto: Partial<Profile>) {
    return this.profileRepository.update(id, dto);
  }

  delete(id: string) {
    return this.profileRepository.delete(id);
  }
}
