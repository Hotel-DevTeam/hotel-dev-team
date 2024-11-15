import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('movimientos')
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @ApiOperation({ summary: 'Crear un nuevo movimiento' })
  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    
    return this.movimientosService.create(createMovimientoDto); 
  }

  @ApiOperation({ summary: 'Obtener todos los movimientos' })
  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un movimiento por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosService.findOneById(id);
  }

  @ApiOperation({ summary: 'Eliminar un movimiento' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosService.remove(id);
  }
}