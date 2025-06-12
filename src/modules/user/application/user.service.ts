import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { Role } from 'src/common/decorators/roles.decorator';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import mongoose from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = new User(
      new mongoose.Types.ObjectId().toString(),
      dto.email,
      hashedPassword,
      Role.User,
    );
    const createdUser = await this.userRepository.create(user);
    return UserResponseDto.fromDomain(createdUser);
  }

  async update(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const updated = await this.userRepository.update(id, dto);
    return UserResponseDto.fromDomain(updated);
  }

  async delete(id: string): Promise<void> {
    return this.userRepository.delete(id);
  }

  async findById(id: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    return UserResponseDto.fromDomain(user);
  }

  async findByEmail(email: string): Promise<UserResponseDto | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) return null;
    return UserResponseDto.fromDomain(user);
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => UserResponseDto.fromDomain(user));
  }
}
