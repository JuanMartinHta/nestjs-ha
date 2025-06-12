import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProfileRepositoryImpl } from './infrastructure/profile.repository.impl';
import { ProfileService } from './application/profile.service';
import { ProfileController } from './infrastructure/profile.controller';
import { UserModule } from '../user/user.module';
import { ProfileSchema } from './infrastructure/profile.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Profile', schema: ProfileSchema }]),
    UserModule,
  ],
  controllers: [ProfileController],
  providers: [
    ProfileService,
    {
      provide: 'ProfileRepository',
      useClass: ProfileRepositoryImpl,
    },
  ],
  exports: ['ProfileRepository', ProfileService],
})
export class ProfileModule {}
