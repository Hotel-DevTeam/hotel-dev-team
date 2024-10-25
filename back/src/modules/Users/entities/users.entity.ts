import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from 'src/modules/Location/entities/location.entity';

@Entity({ name: 'Users' })
export class Users {
  
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'User ID', example: '123e4567-e89b-12d3-a456-426614174000' }) 
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  @ApiProperty({ description: 'Name of the user', example: 'Conti' }) 
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  @ApiProperty({ description: 'Email of the user', example: 'conti@example.com' }) 
  email: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  @ApiProperty({ description: 'Password of the user', example: 'micontraseña' }) 
  password: string;

  @Column({ default: false })
  @ApiProperty({ description: 'Is user an admin', example: false }) 
  isAdmin: boolean;

  @Column('simple-array', { nullable: true }) 
  @ApiProperty({ description: 'Roles of the user', example: ['admin', 'employee'] }) 
  roles: string[];

  @OneToMany(() => Location, (location) => location.admin)
  location: Location[];
}
