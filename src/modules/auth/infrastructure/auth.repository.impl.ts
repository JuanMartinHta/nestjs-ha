import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRepository } from '../domain/auth.repository';
import { AuthOrmEntity } from './auth.orm-entity';
import { User } from 'src/modules/user/domain/user.entity';
import { JwtService } from '@nestjs/jwt';

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

  /* async create(session: AuthSession): Promise<AuthSession> {
    const entity = this.repo.create(session);
    const saved = await this.repo.save(entity);
    return new AuthSession(
      saved.id,
      saved.userId,
      saved.token,
      saved.createdAt,
      saved.expiresAt,
    );
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<AuthSession | null> {
    const found = await this.repo.findOneBy({ id });
    if (!found) return null;
    return new AuthSession(
      found.id,
      found.userId,
      found.token,
      found.createdAt,
      found.expiresAt,
    );
  }

  async findByToken(token: string): Promise<AuthSession | null> {
    const found = await this.repo.findOneBy({ token });
    if (!found) return null;
    return new AuthSession(
      found.id,
      found.userId,
      found.token,
      found.createdAt,
      found.expiresAt,
    );
  }

  async findByUserId(userId: string): Promise<AuthSession[]> {
    const sessions = await this.repo.findBy({ userId });
    return sessions.map(
      (s) => new AuthSession(s.id, s.userId, s.token, s.createdAt, s.expiresAt),
    );
  } */
}
