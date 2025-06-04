import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRepository } from '../domain/auth.repository';
import { AuthOrmEntity } from './auth.orm-entity';
import { User } from 'src/modules/user/domain/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthMapper } from './auth.mapper';
import { AuthSession } from '../domain/auth.entity';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectRepository(AuthOrmEntity)
    private readonly repo: Repository<AuthOrmEntity>,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): { access_token: string } {
    const payload = { id: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async create(session: AuthSession): Promise<AuthSession> {
    const entity = this.repo.create(AuthMapper.toOrm(session));
    const saved = await this.repo.save(entity);
    return AuthMapper.toDomain(saved);
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<AuthSession | null> {
    const found = await this.repo.findOneBy({ id });
    if (!found) return null;
    return AuthMapper.toDomain(found);
  }

  async findByToken(token: string): Promise<AuthSession | null> {
    const found = await this.repo.findOneBy({ token });
    if (!found) return null;
    return AuthMapper.toDomain(found);
  }
}
