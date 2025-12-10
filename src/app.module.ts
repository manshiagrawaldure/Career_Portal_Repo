import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { JobsModule } from './jobs/jobs.module';
import { ApplicationsModule } from './applications/applications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('mongodbUri') ?? '';
        
        if (!uri) {
          throw new Error('MONGODB_URI environment variable is required');
        }

        return {
          uri,
          // Serverless-optimized MongoDB driver options
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
          // Connection pool settings for serverless
          maxPoolSize: 1,
          minPoolSize: 0,
          // Retry settings
          retryWrites: true,
          retryReads: true,
        };
      },
      inject: [ConfigService],
    }),
    JobsModule,
    ApplicationsModule,
  ],
})
export class AppModule {}
