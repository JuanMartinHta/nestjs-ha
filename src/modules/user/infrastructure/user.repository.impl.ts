import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.entity';
import { UserMapper } from './user.mapper';
import { UserDocument } from './user.schema';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: User): Promise<User> {
    const created = await this.userModel.create(UserMapper.toOrm(user));
    return UserMapper.toDomain(created);
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, UserMapper.toOrm(user as User), { new: true })
      .exec();
    if (!updated) throw new NotFoundException('User not found');
    return UserMapper.toDomain(updated);
  }

  async delete(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }

  async findById(id: string): Promise<User | null> {
    const found = await this.userModel.findById(id).exec();
    if (!found) return null;
    return UserMapper.toDomain(found);
  }

  async findByEmail(email: string): Promise<User | null> {
    const found = await this.userModel.findOne({ email }).exec();
    if (!found) return null;
    return UserMapper.toDomain(found);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map((u) => UserMapper.toDomain(u));
  }
}
