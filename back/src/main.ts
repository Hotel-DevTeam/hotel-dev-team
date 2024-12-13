import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './seeds/seed.service'; // Importa el SeedService
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './modules/Users/users.service';
import { AuthGuard } from './modules/Auth/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS con la configuración adecuada
  app.enableCors({
    origin: '*', // o restringe a una URL específica
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });

  // Aplicar el AuthGuard globalmente, para que se aplique a todas las rutas
  app.useGlobalGuards(new AuthGuard(app.get(JwtService), app.get(UsersService)));

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
    await app.listen(3000); // Inicia la aplicación normalmente
  }
}
bootstrap();
