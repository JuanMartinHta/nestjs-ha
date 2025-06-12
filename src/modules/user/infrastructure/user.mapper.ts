import { Role } from 'src/common/decorators/roles.decorator';
import { User } from '../domain/user.entity';

// Adaptador para Mongoose
export class UserMapper {
  static toDomain(userDoc: Record<string, any>): User {
    const id = userDoc._id ? String(userDoc._id) : String(userDoc.id);
    return new User(
      id,
      String(userDoc.email),
      String(userDoc.password),
      userDoc.role as Role,
      undefined, // No se mapea el perfil embebido en Mongo por defecto
    );
  }

  static toOrm(user: User): any {
    return {
      _id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
    };
  }
}
