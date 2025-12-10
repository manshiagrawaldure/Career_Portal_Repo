import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

// Set Mongoose strictQuery to false for compatibility
mongoose.set('strictQuery', false);

let cachedApp: Express | null = null;

async function bootstrap(): Promise<Express> {
  if (cachedApp) {
    return cachedApp;
  }

  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
    {
      logger: ['error', 'warn'],
    },
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.init();
  cachedApp = expressApp;
  return expressApp;
}

export default async function handler(req: Request, res: Response): Promise<void> {
  try {
    const app = await bootstrap();
    
    // Wrap Express handler in a Promise to ensure proper async handling
    return new Promise<void>((resolve, reject) => {
      app(req, res, (err?: any) => {
        if (err) {
          console.error('Express handler error:', err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  } catch (error) {
    console.error('Serverless function error:', error);
    
    // Log detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : undefined;
    
    console.error('Error details:', {
      message: errorMessage,
      stack: errorStack,
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        mongoUriLength: process.env.MONGODB_URI?.length || 0,
        nodeEnv: process.env.NODE_ENV,
      },
    });

    if (!res.headersSent) {
      res.status(500).json({
        message: 'Internal server error',
        error: errorMessage,
        ...(process.env.NODE_ENV !== 'production' && { stack: errorStack }),
      });
    }
  }
}

