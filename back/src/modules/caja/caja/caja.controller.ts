import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('caja')
@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @ApiOperation({ summary: 'Crear una nueva caja' })
  @Post()
  create(@Body() createCajaDto: CreateCajaDto) {
    return this.cajaService.createCaja(createCajaDto);
  }

  @ApiOperation({ summary: 'Obtener todas las cajas' })
  @Get()
  findAll() {
    return this.cajaService.findAll();
  }

  @ApiOperation({ summary: 'Obtener una caja por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cajaService.findOneById(id);
  }

/*   @ApiOperation({ summary: 'Actualizar una caja' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCajaDto: UpdateCajaDto) {
    return this.cajaService.updateCaja(id, updateCajaDto);
  } */
}