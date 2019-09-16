if (process.env.NODE_ENV !== 'production') {
  /* tslint:disable */
  const env = require('dotenv');
  const config = env.config();
  console.log(`Found ENV keys:`, Object.keys(config.parsed).join(','));
  /* tslint:enable */
}

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();
