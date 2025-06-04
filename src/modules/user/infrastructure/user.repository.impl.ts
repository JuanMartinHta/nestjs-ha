import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { UserOrmEntity } from './user.orm-entity';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = this.repo.create(UserMapper.toOrm(user));
    const saved = await this.repo.save(entity);
    return UserMapper.toDomain(saved);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.repo.update(id, UserMapper.toOrm(user as User));
    const updated = await this.repo.findOne({
      where: { id },
      relations: { profile: true },
    });
    if (!updated) throw new NotFoundException('User not found');
    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<User | null> {
    const found = await this.repo.findOne({
      where: { id },
      relations: { profile: true },
    });
    if (!found) return null;
    return UserMapper.toDomain(found);
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.repo.findOne({
      where: { email },
      relations: { profile: true },
    });
    if (!found) return null;
    return UserMapper.toDomain(found);
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.find({ relations: { profile: true } });
    return users.map((u) => UserMapper.toDomain(u));
  }
}
