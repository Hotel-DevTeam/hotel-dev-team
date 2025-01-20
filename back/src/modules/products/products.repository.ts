import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

export class ProductRepository extends Repository<Product> {}
