import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileRepository } from '../domain/profile.repository';
import { Profile } from '../domain/profile.entity';
import { ProfileMapper } from './profile.mapper';
import { ProfileDocument } from './profile.schema';

@Injectable()
export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(
    @InjectModel('Profile')
    private readonly profileModel: Model<ProfileDocument>,
  ) {}

  async create(profile: Profile): Promise<Profile> {
    const created = await this.profileModel.create(
      ProfileMapper.toOrm(profile),
    );
    return ProfileMapper.toDomain(created);
  }

  async update(id: string, profile: Partial<Profile>): Promise<Profile> {
    const updated = await this.profileModel
      .findByIdAndUpdate(id, ProfileMapper.toOrm(profile as Profile), {
        new: true,
      })
      .exec();
    if (!updated) throw new Error('Profile not found');
    return ProfileMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.profileModel.findByIdAndDelete(id).exec();
  }
}
