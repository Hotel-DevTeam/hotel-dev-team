import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Location } from 'src/modules/Location/entities/location.entity';
import { Role } from '../roles.enum';
import { Movimiento } from 'src/modules/caja/movimientos/entities/movimiento.entity';
import { Caja } from 'src/modules/caja/caja/entities/caja.entity';

@Entity({ name: 'Users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({ description: 'Name of the user', example: 'Conti' })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  @ApiProperty({
    description: 'Email of the user',
    example: 'conti@example.com',
  })
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  @ApiProperty({ description: 'Password of the user', example: 'micontraseña' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Admin })
  @ApiProperty({ description: 'User role', example: 'admin' })
  role: Role;

  @ManyToMany(() => Location, { eager: false }) // eager: true para cargar automáticamente si querés
  @JoinTable({
    name: 'user_locations', // nombre de la tabla intermedia
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'locationId',
      referencedColumnName: 'id',
    },
  })
  @ApiProperty({ description: 'Locations the user can access', type: [Location] })
  locations: Location[];

  @OneToMany(() => Location, (location) => location.admin)
  location: Location[];

  
  @ApiProperty({
    description: 'Indicates if the user is an Admin',
    example: true,
  })
  get isAdmin(): boolean {
    return this.role === Role.Admin;
  }

  @OneToMany(() => Movimiento, (movimiento) => movimiento.usuario)
  movimiento: Movimiento[];

  @OneToMany(() => Caja, (caja) => caja.usuario)
  caja: Caja[];
}
