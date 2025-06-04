import { Module } from '@nestjs/common';
import { PostgresDatabaseModule } from './config/postgres.database.module';
import { ConfigModule } from '@nestjs/config';
import { ProfileModule } from './modules/profile/profile.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostgresDatabaseModule,
    AuthModule,
    UserModule,
    ProfileModule,
  ],
})
export class AppModule {}
