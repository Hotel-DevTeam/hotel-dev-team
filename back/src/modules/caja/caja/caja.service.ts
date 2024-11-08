import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Caja } from './entities/caja.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CajaService {
  constructor(
    @InjectRepository(Caja)
    private readonly cajaRepository:Repository<Caja>
  ){}


  createCaja(createCajaDto: CreateCajaDto) {
    const newCaja =  this.cajaRepository.create(createCajaDto);
    return this.cajaRepository.save(newCaja);
  }

  findAll() {
    return this.cajaRepository.find();
  }

  async findOneById(id: string) {
    return this.cajaRepository.findOne({where:{id}});
  }

  async updateCaja(id: string, updateCajaDto: UpdateCajaDto) {
    const caja = await this.cajaRepository.findOne({where:{id}});
    if(!caja){
      throw new NotFoundException(`Caja #${id} no encontrada`);
    }
    const updatedCaja = Object.assign(caja,updateCajaDto)
    return this.cajaRepository.save(updatedCaja);
  }

  
}
