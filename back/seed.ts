import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { SeedService } from './src/seeds/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const seedService = app.get(SeedService);
  await seedService.run();

  await app.close();
}

bootstrap();
