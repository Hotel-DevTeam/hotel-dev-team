import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';

@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @Post()
  create(@Body() createCajaDto: CreateCajaDto) {
    return this.cajaService.createCaja(createCajaDto);
  }

  @Get()
  findAll() {
    return this.cajaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cajaService.findOneById(id);
  }

  

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCajaDto: UpdateCajaDto) {
    return this.cajaService.updateCaja(id, updateCajaDto);
  }
}
/*Rutas:
Creación
Modificación
Traer todos
Desactivar (cambiar a cancelado)

Categoría de movimientos:
Nombre: Char

Creación
Traer todos
*/
