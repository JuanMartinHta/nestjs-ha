import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { AuthRepository } from '../domain/auth.repository';
import { UserRepository } from '../../user/domain/user.repository';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/modules/user/domain/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      throw new HttpException(
        'Password does not match',
        HttpStatus.UNAUTHORIZED,
      );
    return user;
  }

  login(user: User): { access_token: string } {
    return this.authRepository.login(user);
  }

  /*
  async createSession(session: AuthSession): Promise<AuthResponseDto> {
    const created = await this.authRepository.create(session);
    return AuthResponseDto.fromDomain(created);
  }

  async findSessionById(id: string): Promise<AuthResponseDto | null> {
    const session = await this.authRepository.findById(id);
    if (!session) return null;
    return AuthResponseDto.fromDomain(session);
  }

  async findSessionByToken(token: string): Promise<AuthResponseDto | null> {
    const session = await this.authRepository.findByToken(token);
    if (!session) return null;
    return AuthResponseDto.fromDomain(session);
  }
  */
}
