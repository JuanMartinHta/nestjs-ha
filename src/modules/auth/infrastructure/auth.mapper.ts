import { AuthSession } from '../domain/auth.entity';

export class AuthMapper {
  static toDomain(sessionDoc: Record<string, any>): AuthSession {
    const id = sessionDoc._id ? String(sessionDoc._id) : String(sessionDoc.id);
    return new AuthSession(
      id,
      String(sessionDoc.userId),
      String(sessionDoc.token),
      String(sessionDoc.refreshToken),
      Number(sessionDoc.expiresIn || 0),
      Number(sessionDoc.refreshExpiresIn || 0),
    );
  }

  static toOrm(session: AuthSession): any {
    return {
      _id: session.id,
      userId: session.userId,
      token: session.token,
      refreshToken: session.refreshToken,
      expiresIn: session.expiresIn,
      refreshExpiresIn: session.refreshExpiresIn,
    };
  }
}
