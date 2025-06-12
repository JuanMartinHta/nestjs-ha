import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { AuthRepository } from '../domain/auth.repository';
import { UserRepository } from '../../user/domain/user.repository';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/user/domain/user.entity';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthSession } from '../domain/auth.entity';
import mongoose from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Password does not match',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async login(user: User): Promise<AuthResponseDto> {
    const sessionId = new mongoose.Types.ObjectId().toString();

    const payload = {
      user: user.id,
      email: user.email,
      role: user.role,
      session: sessionId,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });

    const authSession = new AuthSession(
      sessionId,
      user.id,
      access_token,
      refresh_token,
      Number(this.configService.get('JWT_EXPIRES_IN')),
      Number(this.configService.get('JWT_REFRESH_EXPIRES_IN')),
    );

    const authSessionSaved = await this.authRepository.login(authSession);

    return AuthResponseDto.fromDomain(authSessionSaved);
  }

  async refreshToken(token: string): Promise<AuthResponseDto> {
    const tokenVerification = this.jwtService.verify<{
      user: string;
      email: string;
      role: string;
      session: string;
    }>(token, { secret: this.configService.get('JWT_SECRET_REFRESH') });

    const payload = {
      user: tokenVerification.user,
      email: tokenVerification.email,
      role: tokenVerification.role,
      session: tokenVerification.session,
    };

    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES_IN'),
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET_REFRESH'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });

    const authSession = new AuthSession(
      tokenVerification.session,
      tokenVerification.user,
      access_token,
      refresh_token,
      Number(this.configService.get('JWT_EXPIRES_IN')),
      Number(this.configService.get('JWT_REFRESH_EXPIRES_IN')),
    );

    const authSessionSaved =
      await this.authRepository.refreshToken(authSession);

    return AuthResponseDto.fromDomain(authSessionSaved);
  }

  async findSessionsByUserId(userId: string): Promise<AuthResponseDto[]> {
    const sessions = await this.authRepository.findSessionsByUserId(userId);
    return sessions.map((session) => AuthResponseDto.fromDomain(session));
  }
}
