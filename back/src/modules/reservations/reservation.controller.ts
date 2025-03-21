import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  InternalServerErrorException,
  NotFoundException,
  ParseUUIDPipe,
  BadRequestException,
  Req,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger'; // Importa los decoradores necesarios
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { Reservation } from './entities/reservation.entity';

@ApiTags('reservas')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationService: ReservationService) {}

  @HttpCode(200)
  @Get('/')
  @ApiResponse({
    status: 200,
    description: 'Lista de reservas obtenida exitosamente.',
  })
  @ApiQuery({
    name: 'completed',
    required: false,
    type: Boolean,
    description: 'Filtrar reservas completadas o no',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Límite de reservas por página',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Número de página para la paginación',
  })
  async getReservations(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 5,
    @Query('completed') completed?: boolean,
  ) {
    try {
      const validPage = Math.max(1, Number(page));
      const validLimit = Math.max(1, Number(limit));
      return await this.reservationService.getReservations(
        validPage,
        validLimit,
        completed,
      );
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener reservas');
    }
  }


  @HttpCode(200)
  @Get('/byRoom')
  @ApiResponse({
    status: 200,
    description: 'Lista de reservas obtenida exitosamente.',
  })
  @ApiQuery({
    name: 'completed',
    required: false,
    type: Boolean,
    description: 'Filtrar reservas completadas o no',
  })
  async getReservationsByRoom(
    @Query('completed') completed?: boolean,
  ) {
    try {
      return await this.reservationService.getReservationsByRoom(
        completed,
      );
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener reservas');
    }
  }

  @HttpCode(200)
  @Get('/findEmail')
  @ApiResponse({ status: 200, description: 'Reserva encontrada por email.' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
  @ApiQuery({
    name: 'email',
    required: true,
    description: 'Email de la reserva a buscar',
  })
  async getReservationByMail(@Query('email') email: string) {
    try {
      return await this.reservationService.getReservationByMail(email);
    } catch (error) {
      throw new NotFoundException('Error al buscar la reserva por email');
    }
  }

  @HttpCode(200)
  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Reserva encontrada por ID.' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID de la reserva a buscar',
  })
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
  @ApiResponse({ status: 201, description: 'Reserva creada exitosamente.' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta.' })
  async createReservation(
    @Body() createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    return await this.reservationService.createReservation(
      createReservationDto,
    );
  }

  @Patch(':id/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La reserva fue cancelada exitosamente.',
    type: Reservation,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la reserva con el ID proporcionado.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'La reserva ya estaba cancelada.',
  })
  async cancelReservation(@Param('id') id: string) {
    const cancelledReservation =
      await this.reservationService.cancelReservation(id);
    return {
      message: 'Reserva cancelada exitosamente',
      reservation: cancelledReservation,
    };
  }

  @Patch(':id/complete')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'La reserva fue finalizada exitosamente.',
    type: Reservation,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No se encontró la reserva con el ID proporcionado.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'La reserva ya estaba finalizada.',
  })
  async completeReservation(@Param('id') id: string) {
    const cancelledReservation =
      await this.reservationService.finalizeReservation(id);
    return {
      message: 'Reserva finalizada exitosamente',
      reservation: cancelledReservation,
    };
  }
}
