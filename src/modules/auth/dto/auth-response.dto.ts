import { AuthSession } from '../domain/auth.entity';

export class AuthResponseDto {
  id: string;
  userId: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;

  static fromDomain(session: AuthSession): AuthResponseDto {
    return {
      id: session.id,
      userId: session.userId,
      token: session.token,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
    };
  }
}
