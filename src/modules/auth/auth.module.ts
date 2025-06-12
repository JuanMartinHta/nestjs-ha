import { Module } from '@nestjs/common';
import { AuthRepositoryImpl } from './infrastructure/auth.repository.impl';
import { AuthService } from './application/auth.service';
import { AuthController } from './infrastructure/auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthSessionSchema } from './infrastructure/auth.session.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AuthSession', schema: AuthSessionSchema },
    ]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    {
      provide: 'AuthRepository',
      useClass: AuthRepositoryImpl,
    },
  ],
  exports: ['AuthRepository', AuthService],
})
export class AuthModule {}
