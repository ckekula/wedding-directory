import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EmbeddingsService } from '../modules/ai/embeddings.service';
import * as dotenv from 'dotenv';

// Explicitly load environment variables
dotenv.config();

async function bootstrap() {
  console.log('DATABASE_URL:', process.env.DATABASE_URL);
  console.log('MONGODB_URI:', process.env.MONGODB_URI);
  
  const app = await NestFactory.createApplicationContext(AppModule);
  
  try {
    const embeddingsService = app.get(EmbeddingsService);
    console.log('Starting to generate embeddings for all vendors...');
    
    await embeddingsService.indexAllVendors();
    
    console.log('Embeddings generation completed successfully.');
  } catch (error) {
    console.error('Error generating embeddings:', error);
  } finally {
    await app.close();
  }
}

bootstrap();