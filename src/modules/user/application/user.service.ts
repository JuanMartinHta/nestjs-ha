import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Role } from 'src/common/decorators/roles.decorator';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new User(uuidv4(), dto.email, hashedPassword, Role.User);
    return this.userRepository.create(user);
  }

  update(id: string, dto: UpdateUserDto) {
    return this.userRepository.update(id, dto);
  }

  delete(id: string) {
    return this.userRepository.delete(id);
  }

  findById(id: string): Promise<Omit<User, 'password'> | null> {
    return this.userRepository.findById(id).then((user) => {
      if (!user) return null;
      return this.filterUser(user);
    });
  }

  findByEmail(email: string): Promise<Omit<User, 'password'> | null> {
    return this.userRepository.findByEmail(email).then((user) => {
      if (!user) return null;
      return this.filterUser(user);
    });
  }

  findAll(): Promise<Omit<User, 'password'>[]> {
    return this.userRepository.findAll().then((users) => {
      return users.map((user) => this.filterUser(user));
    });
  }

  private filterUser(user: User): Omit<User, 'password'> {
    const filteredUser = {
      id: user.id,
      email: user.email,
      role: user.role,
      profileId: user.profileId,
      profile: user.profile,
    };
    return filteredUser;
  }
}
