import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './reservations/reservation.module';
import typeOrmConfig from './config/typeorm';
import { ExchangeRateController } from './dollar/dollar.controller';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateService } from './dollar/dollar.service';
import { UsersModule } from './modules/Users/users.module';
import { AuthModule } from './modules/Auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    ReservationModule,
    HttpModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController,ExchangeRateController],
  providers: [AppService,ExchangeRateService],
})
export class AppModule {}
