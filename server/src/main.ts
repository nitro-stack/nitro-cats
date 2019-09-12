if (process.env.NODE_ENV !== 'production') {
  const env = require('dotenv');
  const config = env.config();
  console.log(`Found ENV keys:`, Object.keys(config.parsed).join(','));
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
