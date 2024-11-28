import { Module } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CajaController } from './caja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caja } from './entities/caja.entity';
import { Movimiento } from '../movimientos/entities/movimiento.entity';
import { Users } from 'src/modules/Users/entities/users.entity';
import { Location } from 'src/modules/Location/entities/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Caja, Users, Location, Movimiento])],
  controllers: [CajaController],
  providers: [CajaService],
})
export class CajaModule {}
