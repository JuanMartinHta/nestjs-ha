import { AuthSession } from '../domain/auth.entity';
import { AuthOrmEntity } from '../infrastructure/auth.orm-entity';

export class AuthMapper {
  static toDomain(entity: AuthOrmEntity): AuthSession {
    return new AuthSession(
      entity.id,
      entity.userId,
      entity.token,
      entity.createdAt,
      entity.expiresAt,
    );
  }

  static toOrm(session: AuthSession): Partial<AuthOrmEntity> {
    return {
      id: session.id,
      userId: session.userId,
      token: session.token,
      createdAt: session.createdAt,
      expiresAt: session.expiresAt,
    };
  }
}
