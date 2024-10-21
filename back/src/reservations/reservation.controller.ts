import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Query, InternalServerErrorException, NotFoundException, ParseUUIDPipe, BadRequestException, Req, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { UpdateReservaDto } from './dto/update-reservation.dto';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { plainToClass } from 'class-transformer';
import { Reservation } from './entities/reservation.entity';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationService) {}

  @HttpCode(200)
  @Get('/')
  async getReservations(
    @Query('page', ParseIntPipe) page = 1, 
    @Query('limit', ParseIntPipe) limit = 5,
    @Query('completed') completed?: boolean 
  ) {
    try {
      const validPage = Math.max(1, Number(page));
      const validLimit = Math.max(1, Number(limit));
      return await this.reservationService.getReservations(validPage, validLimit, completed);
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener reservas');
    }
  }

  @HttpCode(200)
  @Get('/findEmail')
  async getReservationByMail(@Query('email') email: string) {
    try {
      return await this.reservationService.getReservationByMail(email);
    } catch (error) {
      throw new NotFoundException('Error al buscar la reserva por email');
    }
  }

  @HttpCode(200)
  @Get('/:id')
  async getReservationById(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const reservation = await this.reservationService.getReservationById(id);
      if (!reservation) {
        throw new NotFoundException('Reserva no encontrada');
      }
      return reservation;
    } catch (error) {
      throw new NotFoundException('Error al buscar la reserva por ID');
    }
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return await this.reservationService.createReservation(createReservationDto);
  }
}




/* Una ruta que permita cargar nuevas reservas y traer todas las reservas existentes, con todos sus datos. 
La ruta get debería poder filtrar entre finalizadas y no finalizadas, y devolver las reservas que cumplan esa condición */