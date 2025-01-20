import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimiento } from './entities/movimiento.entity';
import { Estado } from '../caja/caja.enum';
import { Users } from 'src/modules/Users/entities/users.entity';

@Injectable()
export class MovimientosService {
  constructor(
    @InjectRepository(Movimiento)
    private readonly movRepository: Repository<Movimiento>,
  ) {}

  async create(createMovimientoDto: CreateMovimientoDto) {
    try {
      const newMov = this.movRepository.create(createMovimientoDto);
      return await this.movRepository.save(newMov);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el movimiento');
    }
  }

  async findAll(locationId: string): Promise<Movimiento[]> {
    try {
      return await this.movRepository.find({ where: {ubicacion: {id: locationId}}});
    } catch (error) {
      throw new InternalServerErrorException(
        'Error al obtener la lista de movimientos',
      );
    }
  }

  async findOneById(id: string) {
    try {
      const movimiento = await this.movRepository.findOne({ where: { id } });
      if (!movimiento) {
        throw new NotFoundException(`Movimiento con id ${id} no encontrado`);
      }
      return movimiento;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error al buscar el movimiento con id ${id}`,
      );
    }
  }

  async findOneByDate(fecha: Date) {
    try {
      const movimiento = await this.movRepository.findOne({ where: { fecha } });
      if (!movimiento) {
        throw new NotFoundException(
          `Movimiento con fecha ${fecha} no encontrado`,
        );
      }
      return movimiento;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error al buscar el movimiento con fecha ${fecha}`,
      );
    }
  }

  async remove(id: string) {
    try {
      const movimiento = await this.findOneById(id);
      if (!movimiento) {
        throw new NotFoundException(`Movimiento con id ${id} no encontrado`);
      }
      movimiento.estado = Estado.Cancelado;
      return await this.movRepository.save(movimiento);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error al eliminar el movimiento con id ${id}`,
      );
    }
  }
}
