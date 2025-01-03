import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { Caja } from 'src/modules/caja/caja/entities/caja.entity';
import { Movimiento } from 'src/modules/caja/movimientos/entities/movimiento.entity';
import { Location } from 'src/modules/Location/entities/location.entity';
import { Pax } from 'src/modules/pax/entity/pax.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { Room } from 'src/modules/Rooms/entities/rooms.entity';
import { SalesOrder } from 'src/modules/SalesOrder/entities/salesOrder.entity';
import { SalesOrderLine } from 'src/modules/SalesOrderLine/entities/salesOrderLine.entity';
import { Users } from 'src/modules/Users/entities/users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenvConfig({ path: '.env.development' });

const config: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT as unknown as number | 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  dropSchema: false,

  logging: true,
  synchronize: true,
  entities: [
    Location,
    Room,
    Users,
    Caja,
    Product,
    Reservation,
    SalesOrder,
    SalesOrderLine,
    Pax,
    Movimiento,
  ],
  migrations: ['dist/migrations/*{.ts,.js}'],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
