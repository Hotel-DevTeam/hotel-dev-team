import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { CajaService } from './caja.service';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('caja')
@Controller('caja')
export class CajaController {
  constructor(private readonly cajaService: CajaService) {}

  @ApiOperation({ summary: 'Crear una nueva caja' })
  @Post()
  create(@Body() createCajaDto: CreateCajaDto) {
    return this.cajaService.createCaja(createCajaDto);
  }

  @ApiOperation({ summary: 'Obtener todas las cajas, filtradas opcionalmente por ubicación y tipo de movimiento' })
  @ApiQuery({ name: 'locationId', required: false, description: 'ID de la ubicación' })
  @ApiQuery({ name: 'tipoMovimiento', required: false, description: 'Tipo de movimiento (ingreso, egreso, etc.)' })
  @Get()
  findAll(
    @Query('locationId') locationId?: string,
    @Query('tipoMovimiento') tipoMovimiento?: string,
  ) {
    return this.cajaService.findAll({ locationId, tipoMovimiento });
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
