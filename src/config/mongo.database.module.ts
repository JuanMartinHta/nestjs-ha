import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri:
          configService.get('MONGO_URI') ||
          'mongodb://localhost:27017/perspectiva',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class MongoDatabaseModule {}
