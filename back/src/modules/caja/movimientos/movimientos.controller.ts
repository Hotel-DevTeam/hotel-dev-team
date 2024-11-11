import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('movimientos')
@Controller('movimientos')
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  /*   @ApiOperation({ summary: 'Crear un nuevo movimiento' })
  @ApiResponse({ status: 201, description: 'El movimiento ha sido creado.' })
  @ApiResponse({ status: 500, description: 'Error al crear el movimiento.' })
  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto, @Req() req) {
    const userId = req.user.id; 
    return this.movimientosService.create(createMovimientoDto, userId); 
  } */

  @ApiOperation({ summary: 'Obtener todos los movimientos' })
  @ApiResponse({ status: 200, description: 'Lista de movimientos.' })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener la lista de movimientos.',
  })
  @Get()
  findAll() {
    return this.movimientosService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un movimiento por ID' })
  @ApiResponse({ status: 200, description: 'Movimiento encontrado.' })
  @ApiResponse({ status: 404, description: 'Movimiento no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error al buscar el movimiento.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosService.findOneById(id);
  }

  @ApiOperation({ summary: 'Eliminar un movimiento' })
  @ApiResponse({ status: 200, description: 'Movimiento eliminado.' })
  @ApiResponse({ status: 404, description: 'Movimiento no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error al eliminar el movimiento.' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosService.remove(id);
  }
}
