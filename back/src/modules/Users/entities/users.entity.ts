import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @OneToMany(() => Location, (location) => location.admin)
  location: Location[];

  // Getter para isAdmin, no se almacena en la base de datos
  @ApiProperty({
    description: 'Indicates if the user is an Admin',
    example: true,
  })
  get isAdmin(): boolean {
    return this.role === Role.Admin;
  }

  @OneToMany(() => Movimiento, (movimiento) => movimiento.usuario)
  movimiento: Movimiento[];

  //optional
  @OneToOne(() => Caja, (caja) => caja.usuario)
  caja: Caja;
  
}
