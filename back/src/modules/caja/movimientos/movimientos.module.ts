import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';

@Module({
  controllers: [MovimientosController],
  providers: [MovimientosService],
})
export class MovimientosModule {}
