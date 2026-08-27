import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { AuthModule } from '../../Auth/auth.module';
import { UsersModule } from '../../Users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movimiento]),
    AuthModule,
    UsersModule,
  ],
  controllers: [MovimientosController],
  providers: [MovimientosService],
  exports: [MovimientosService]
})
export class MovimientosModule {}
