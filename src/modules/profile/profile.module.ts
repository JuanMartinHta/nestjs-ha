import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileOrmEntity } from './infrastructure/profile.orm-entity';
import { ProfileRepositoryImpl } from './infrastructure/profile.repository.impl';
import { ProfileService } from './application/profile.service';
import { ProfileController } from './infrastructure/profile.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProfileOrmEntity]), UserModule],
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
