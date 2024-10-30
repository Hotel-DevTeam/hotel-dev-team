import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './modules/reservations/reservation.module';
import typeOrmConfig from './config/typeorm';
import { ExchangeRateController } from './modules/dollar/dollar.controller';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRateService } from './modules/dollar/dollar.service';
import { UsersModule } from './modules/Users/users.module';
import { AuthModule } from './modules/Auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CajaModule } from './modules/caja/caja.module';

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
    AuthModule,
    ProductsModule,
    CajaModule
  ],
  controllers: [AppController,ExchangeRateController],
  providers: [AppService,ExchangeRateService],
})
export class AppModule {}
