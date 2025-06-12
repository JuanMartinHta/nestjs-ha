/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRepository } from '../domain/auth.repository';
import { AuthSession } from '../domain/auth.entity';
import { AuthSessionDocument } from './auth.session.schema';
import { AuthMapper } from './auth.mapper';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(
    @InjectModel('AuthSession')
    private readonly sessionModel: Model<AuthSessionDocument>,
  ) {}

  async login(authSession: AuthSession): Promise<AuthSession> {
    const created = await this.sessionModel.create(
      AuthMapper.toOrm(authSession),
    );

    return AuthMapper.toDomain(created);
  }

  async refreshToken(authSession: AuthSession): Promise<AuthSession> {
    const orm = AuthMapper.toOrm(authSession);

    const updated = await this.sessionModel
      .findOneAndUpdate(
        { userId: authSession.id },
        {
          token: orm.token,
          refreshToken: orm.refreshToken,
          expiresIn: orm.expiresIn,
          refreshExpiresIn: orm.refreshExpiresIn,
        },
        { new: true, upsert: true },
      )
      .exec();

    if (!updated) {
      throw new Error('Session not found or could not be updated');
    }

    return AuthMapper.toDomain(updated);
  }

  async findSessionsByUserId(userId: string): Promise<AuthSession[]> {
    const sessions = await this.sessionModel.find({ userId }).exec();
    return sessions.map((s) => AuthMapper.toDomain(s));
  }
}
