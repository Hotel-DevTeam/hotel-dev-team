import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Movimiento } from './entities/movimiento.entity';
import { AuthGuard } from '../../Auth/guards/auth.guard';
import { RolesGuard } from '../../Auth/guards/roles.guard';
import { Roles } from '../../Decorators/roles.decorator';
import { Role } from '../../Users/roles.enum';

@ApiTags('movimientos')
@Controller('movimientos')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @ApiOperation({ summary: 'Crear un nuevo movimiento' })
  @Post()
  create(@Body() createMovimientoDto: CreateMovimientoDto) {
    return this.movimientosService.create(createMovimientoDto);
  }


  @Get(':locationId')
  @ApiOperation({
    summary: 'Obtener todos los movimientos de una ubicación específica',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los movimientos de una ubicación especificada.',
  })
  @ApiResponse({ status: 404, description: 'Ubicación no encontrada.' })
  findAll(@Param('locationId') locationId:string): Promise<Movimiento[]>{
    return this.movimientosService.findAll(locationId)
  }

  @ApiOperation({ summary: 'Obtener un movimiento por ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimientosService.findOneById(id);
  }

  @ApiOperation({ summary: 'Eliminar un movimiento' })
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimientosService.remove(id);
  }
}
