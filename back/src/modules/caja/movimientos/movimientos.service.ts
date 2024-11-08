import { Injectable } from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { UpdateMovimientoDto } from './dto/update-movimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';

@Injectable()
export class MovimientosService {
  constructor( 
     @InjectRepository(Movimiento) private readonly movRepository:Repository<Movimiento>) {}


  create(createMovimientoDto: CreateMovimientoDto) {
    return 'This action adds a new movimiento';
  }

  findAll() {
    return this.movRepository.find();
  }

  findOneById(id: string) {
    return this.movRepository.findOne({where:{id}});
  }

  findOneByDate(fecha: Date) {
    return this.movRepository.findOne({where:{fecha}});
  }

  update(id: number, updateMovimientoDto: UpdateMovimientoDto) {
    return `This action updates a #${id} movimiento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimiento`;
  }
}
