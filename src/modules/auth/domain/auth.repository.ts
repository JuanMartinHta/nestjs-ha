import { User } from 'src/modules/user/domain/user.entity';

export interface AuthRepository {
  login(user: User): { access_token: string };
  /* create(session: AuthSession): Promise<AuthSession>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<AuthSession | null>;
  findByToken(token: string): Promise<AuthSession | null>;
  findByUserId(userId: string): Promise<AuthSession[]>; */
}
