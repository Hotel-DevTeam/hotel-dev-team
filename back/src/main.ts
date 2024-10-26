import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors'; // Importa el paquete cors si lo necesitas

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configura CORS
  app.enableCors({
    origin: 'http://localhost:3001', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true, 
  });

  const config = new DocumentBuilder()
    .setTitle('API de Reserva')
    .setDescription('Documentación de la API para el sistema de reservas')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('reservas')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
