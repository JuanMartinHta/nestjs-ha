import { AuthSession } from './auth.entity';

export interface AuthRepository {
  login(authSession: AuthSession): Promise<AuthSession>;
  refreshToken(authSession: AuthSession): Promise<AuthSession>;
  findSessionsByUserId(userId: string): Promise<AuthSession[]>;
}
