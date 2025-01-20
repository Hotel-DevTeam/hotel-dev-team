import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Location } from '../Location/entities/location.entity';

@ApiTags('products')
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
) {}

  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'El producto ha sido creado.' })
  @ApiResponse({ status: 500, description: 'Error al crear el producto.' })
  async createProduct(createProductDto: CreateProductDto) {
    const { ubicacionId, ...productData } = createProductDto;
  
    try {
      const location = await this.locationRepository.findOne({
        where: { id: ubicacionId },
      });
      if (!location) {
        throw new NotFoundException(`La ubicación con id ${ubicacionId} no existe`);
      }
  
      const newProduct = this.productRepository.create({
        ...productData,
        ubicacion: location,
      });
  
      return await this.productRepository.save(newProduct);
    } catch (error) {
      console.error('Error al crear el producto:', error);
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }
  

  @ApiOperation({ summary: 'Obtener todos los productos' })
  @ApiResponse({ status: 200, description: 'Lista de productos.' })
  @ApiResponse({
    status: 500,
    description: 'Error al obtener la lista de productos.',
  })
  async findAll() {
    try {
      return await this.productRepository.find({
        relations: ['ubicacion'],
      });
    } catch {
      throw new InternalServerErrorException(
        'Error al obtener la lista de productos',
      );
    }
  }

  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error al buscar el producto.' })
  async findOneById(id: string): Promise<Product> {
    try {
      console.log(`Buscando producto id ${id}`);
      const product = await this.productRepository.findOne({
        where: { id },
        relations: ['ubicacion'],
      });

      if (!product) {
        console.log(`Producto id ${id} no encontrado`);
        throw new NotFoundException(`Producto id ${id} no encontrado`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error al buscar el producto con id ${id}`,
      );
    }
  }

  @ApiOperation({ summary: 'Actualizar un producto' })
  @ApiResponse({ status: 200, description: 'Producto actualizado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error al actualizar el producto.' })
  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOneById(id);

      Object.assign(product, updateProductDto);
      return await this.productRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error al actualizar el producto con id ${id}`,
      );
    }
  }

  @ApiOperation({ summary: 'Eliminar un producto' })
  @ApiResponse({ status: 200, description: 'Producto eliminado.' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado.' })
  @ApiResponse({ status: 500, description: 'Error al eliminar el producto.' })
  async removeProduct(id: string) {
    try {
      const product = await this.findOneById(id);

      product.Activo = false;
      return await this.productRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        `Error al eliminar el producto con id ${id}`,
      );
    }
  }
}
