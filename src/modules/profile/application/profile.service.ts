import { Injectable, Inject } from '@nestjs/common';
import { ProfileRepository } from '../domain/profile.repository';
import { Profile } from '../domain/profile.entity';
import { UserRepository } from 'src/modules/user/domain/user.repository';
import { CreateProfileDto } from '../dto/create-profile.dto';
import { ProfileResponseDto } from '../dto/profile-response.dto';
import mongoose from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @Inject('ProfileRepository')
    private readonly profileRepository: ProfileRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateProfileDto): Promise<ProfileResponseDto> {
    const user = await this.userRepository.findById(dto.userId);
    if (!user) throw new Error('User not found');
    const profile = new Profile(
      new mongoose.Types.ObjectId().toString(),
      dto.name,
      dto.bio,
      dto.userId,
    );

    const profileSaved = await this.profileRepository.create(profile);

    return ProfileResponseDto.fromDomain(profileSaved);
  }

  async update(id: string, dto: Partial<Profile>): Promise<ProfileResponseDto> {
    const updated = await this.profileRepository.update(id, dto);
    return ProfileResponseDto.fromDomain(updated);
  }

  async delete(id: string): Promise<void> {
    return this.profileRepository.delete(id);
  }
}
