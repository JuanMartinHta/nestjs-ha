import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import { UserService } from './application/user.service';
import { UserController } from './infrastructure/user.controller';
import { UserSchema } from './infrastructure/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: ['UserRepository', UserService],
})
export class UserModule {}
