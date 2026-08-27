import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './seeds/seed.service'; // Importa el SeedService

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activa las validaciones de class-validator declaradas en los DTOs
  // (antes eran solo metadata para Swagger y nunca se ejecutaban).
  // Sin whitelist/forbidNonWhitelisted por ahora: varios DTOs tienen
  // objetos anidados (pax, roomType, ubicacion) sin @Type()/@ValidateNested(),
  // y activar esas opciones los rechazaría o vaciaría en runtime.
  app.useGlobalPipes(new ValidationPipe());

  // Habilitar CORS con la configuración adecuada
  app.enableCors({
    origin: '*',
    //origin: 'http://localhost:3001', // Origen permitido
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH', // Métodos permitidos
    credentials: true,
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Reserva')
    .setDescription('Documentación de la API para el sistema de reservas')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('reservas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Ejecutar el seeder si se pasa el argumento "seed"
  const args = process.argv.slice(2);
  if (args.includes('seed')) {
    const seedService = app.get(SeedService);
    await seedService.run(); // Ejecuta el seeder
    console.log('Database seeding completed');
    await app.close(); // Cierra la aplicación después de sembrar
  } else {
    await app.listen(process.env.API_PORT); // Inicia la aplicación normalmente
  }
}
bootstrap();
