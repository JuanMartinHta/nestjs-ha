import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { UserOrmEntity } from './user.orm-entity';
import { Role } from 'src/common/decorators/roles.decorator';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const entity = this.repo.create(user);
    const saved = await this.repo.save(entity);
    return new User(saved.id, saved.email, saved.password, saved.role as Role);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.repo.update(id, user);
    const updated = await this.repo.findOneBy({ id });
    if (!updated) throw new Error('User not found');
    return new User(
      updated.id,
      updated.email,
      updated.password,
      updated.role as Role,
    );
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

    // Devuelve el usuario con su perfil completo
    return new User(
      found.id,
      found.email,
      found.password,
      found.role as Role,
      found.profileId,
      found.profile, // Incluye el perfil completo
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.repo.findOneBy({ email });
    if (!found) return null;
    return new User(found.id, found.email, found.password, found.role as Role);
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.find();
    return users.map(
      (u) => new User(u.id, u.email, u.password, u.role as Role),
    );
  }
}
