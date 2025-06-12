import { AuthSession } from '../domain/auth.entity';

export class AuthResponseDto {
  id: string;
  userId: string;
  token: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;

  static fromDomain(session: AuthSession): AuthResponseDto {
    return {
      id: session.id,
      userId: session.userId,
      token: session.token,
      refreshToken: session.refreshToken,
      expiresIn: session.expiresIn,
      refreshExpiresIn: session.refreshExpiresIn,
    };
  }
}
