import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Caja } from './entities/caja.entity';
import { Movimiento } from '../movimientos/entities/movimiento.entity';
import { Users } from 'src/modules/Users/entities/users.entity';
import { Location } from 'src/modules/Location/entities/location.entity';
import { CreateCajaDto } from './dto/create-caja.dto';
import { UpdateCajaDto } from './dto/update-caja.dto';

@Injectable()
export class CajaService {
  constructor(
    @InjectRepository(Caja)
    private readonly cajaRepository: Repository<Caja>,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Movimiento)
    private readonly movimientoRepository: Repository<Movimiento>,
  ) {}

  async createCaja(createCajaDto: CreateCajaDto) {
    const { usuarioId, ubicacionId, movimiento: movimientoIds, ...data } = createCajaDto;

    try {
      console.log('Recibiendo datos para crear caja:', createCajaDto);

      // Buscar usuario
      const usuario = await this.userRepository.findOne({
        where: { id: usuarioId },
      });
      if (!usuario) {
        console.log(`Usuario con ID ${usuarioId} no encontrado`);
        throw new NotFoundException('Usuario no encontrado');
      }
      console.log('Usuario encontrado:', usuario);

      // Buscar ubicación
      const ubicacion = await this.locationRepository.findOne({
        where: { id: ubicacionId },
      });
      if (!ubicacion) {
        console.log(`Ubicación con ID ${ubicacionId} no encontrada`);
        throw new NotFoundException('Ubicación no encontrada');
      }
      console.log('Ubicación encontrada:', ubicacion);

      // Buscar movimientos si existen
      let movimientos = [];
      if (movimientoIds && movimientoIds.length > 0) {
        movimientos = await this.movimientoRepository.findBy({
          id: In(movimientoIds),
        });
        if (!movimientos.length) {
          console.log(
            `No se encontraron movimientos con los IDs: ${movimientoIds}`,
          );
          throw new NotFoundException('Movimientos no encontrados');
        }
      }
      console.log('Movimientos encontrados:', movimientos);

      // Crear la nueva caja
      const newCaja = this.cajaRepository.create({
        ...data,
        usuario,
        ubicacion,
        movimiento: movimientos,
      });
      console.log('Creando nueva caja:', newCaja);

      // Guardar la caja
      const savedCaja = await this.cajaRepository.save(newCaja);
      console.log('Caja creada exitosamente:', savedCaja);

      // Actualizar los movimientos con la relación con la caja
      for (const movimiento of movimientos) {
        movimiento.caja = savedCaja;
      }

      // Guardar los movimientos actualizados
      if (movimientos.length > 0) {
        await this.movimientoRepository.save(movimientos);
        console.log('Movimientos actualizados con la caja:', movimientos);
      }

      return savedCaja;
    } catch (error) {
      console.error('Error al crear caja:', error);
      throw error;
    }
  }

  async findAll(filters?: { locationId?: string; tipoMovimiento?: string }) {
    const { locationId, tipoMovimiento } = filters || {};
    
    const query = this.cajaRepository.createQueryBuilder('caja')
      .leftJoinAndSelect('caja.movimiento', 'movimiento')
      .leftJoinAndSelect('caja.ubicacion', 'ubicacion');

    if (locationId) {
      query.andWhere('ubicacion.id = :locationId', { locationId });
    }

    if (tipoMovimiento) {
      query.andWhere('movimiento.tipo = :tipoMovimiento', { tipoMovimiento });
    }

    const cajas = await query.getMany();
    if (!cajas.length) {
      throw new NotFoundException('No se encontraron cajas con los filtros proporcionados');
    }

    return cajas;
  }

  async findOneById(id: string) {
    const caja = await this.cajaRepository.findOne({ where: { id } });
    if (!caja) {
      throw new NotFoundException(`Caja con id ${id} no encontrada`);
    }
    return caja;
  }

  async updateCaja(id: string, updateCajaDto: UpdateCajaDto) {
    const caja = await this.cajaRepository.findOne({ where: { id } });
    if (!caja) {
      throw new NotFoundException(`Caja con id ${id} no encontrada`);
    }
    if (Object.keys(updateCajaDto).length === 0) {
      throw new InternalServerErrorException('No hay valores para actualizar');
    }
    const updatedCaja = Object.assign(caja, updateCajaDto);
    return this.cajaRepository.save(updatedCaja);
  }
}

