import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { Pax } from 'src/modules/pax/entity/pax.entity';
import { Status } from './status.enum';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    @InjectRepository(Pax)
    private paxRepository: Repository<Pax>,
  ) {}
  async getReservations(page: number, limit: number, completed?: boolean) {
    try {
      const query =
        this.reservationsRepository.createQueryBuilder('reservation');
      if (completed !== undefined) {
        query.where('reservation.completed = :completed', { completed });
      }
      const totalReservations = await query.getMany();

      const start = (page - 1) * limit;
      const end = start + limit;

      const reservations = totalReservations.slice(start, end);
      return {
        total: totalReservations.length,
        page,
        limit,
        reservations,
      };
    } catch (error) {
      throw new BadRequestException('Error al obtener reservas');
    }
  }

  async getReservationByMail(email: string): Promise<Reservation> {
    try {
      console.log('Buscando la reserva con email:', email);
      const reservation = await this.reservationsRepository.findOne({
        where: {
          pax: {
            email,
          },
        },
        relations: ['pax'],
      });
      console.log('Reserva encontrada:', reservation);
      if (!reservation) {
        throw new NotFoundException(
          `Reserva no encontrada para el email: ${email}`,
        );
      }
      return reservation;
    } catch (error) {
      throw new NotFoundException('Error al buscar la reserva');
    }
  }

  async getReservationById(id: string): Promise<Partial<Reservation>> {
    try {
      const reservation = await this.reservationsRepository.findOne({
        where: { id },
      });
      if (!reservation) {
        throw new NotFoundException('Reserva no encontrada');
      }
      return reservation;
    } catch (error) {
      throw new NotFoundException('Error al buscar la reserva por ID');
    }
  }

  async createReservation(createReservationDto: CreateReservationDto) {
    let visitor = await this.paxRepository.findOne({
      where: { email: createReservationDto.pax.email },
    });

    if (!visitor) {
      visitor = this.paxRepository.create({
        name: createReservationDto.pax.name,
        lastname: createReservationDto.pax.lastname,
        email: createReservationDto.pax.email,
        dniPassport: createReservationDto.pax.dniPassport,
        phone: createReservationDto.pax.phone,
        birthdate: createReservationDto.pax.birthdate,
      });
      await this.paxRepository.save(visitor);
    }

    const reservation = this.reservationsRepository.create({
      ...createReservationDto,
      pax: visitor,
    });
    return await this.reservationsRepository.save(reservation);
  }

  async cancelReservation(id: string) {
    const findReservation = await this.getReservationById(id);
    if (!findReservation) {
      throw new NotFoundException('Error al buscar la reserva por ID');
    }

    if (
      findReservation.status === Status.Cancelled ||
      findReservation.status === Status.Completed
    ) {
      throw new BadRequestException(
        'La reserva ya está cancelada o ha sido completada',
      );
    }

    findReservation.status = Status.Cancelled;
    if (!findReservation.notasAdicionales) {
      findReservation.notasAdicionales = [];
    }
    findReservation.notasAdicionales.push('Reserva cancelada');
    await this.reservationsRepository.save(findReservation);

    return findReservation;
  }
}
