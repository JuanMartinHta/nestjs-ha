import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileRepository } from '../domain/profile.repository';
import { Profile } from '../domain/profile.entity';
import { ProfileOrmEntity } from './profile.orm-entity';

@Injectable()
export class ProfileRepositoryImpl implements ProfileRepository {
  constructor(
    @InjectRepository(ProfileOrmEntity)
    private readonly repo: Repository<ProfileOrmEntity>,
  ) {}

  async create(profile: Profile): Promise<Profile> {
    const entity = this.repo.create(profile);
    const saved = await this.repo.save(entity);
    return new Profile(saved.id, saved.name, saved.bio);
  }

  async update(id: string, profile: Partial<Profile>): Promise<Profile> {
    await this.repo.update(id, profile);
    const updated = await this.repo.findOneBy({ id });
    if (!updated) throw new Error('Profile not found');
    return new Profile(updated.id, updated.name, updated.bio);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
