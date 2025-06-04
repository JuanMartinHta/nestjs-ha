import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthRepository } from '../domain/auth.repository';
import { AuthOrmEntity } from './auth.orm-entity';
import { User } from 'src/modules/user/domain/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthMapper } from './auth.mapper';
import { AuthSession } from '../domain/auth.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectRepository(AuthOrmEntity)
    private readonly repo: Repository<AuthOrmEntity>,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  login(user: User): { access_token: string; refresh_token: string } {
    const payload = { id: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });

    return { access_token, refresh_token };
  }

  refreshToken(token: string): { access_token: string; refresh_token: string } {
    const tokenVerification = this.jwtService.verify<{
      id: string;
      email: string;
      role: string;
    }>(token, { secret: this.configService.get('JWT_SECRET_REFRESH') });

    const payload = {
      id: tokenVerification.id,
      email: tokenVerification.email,
      role: tokenVerification.role,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });

    return { access_token, refresh_token };
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
