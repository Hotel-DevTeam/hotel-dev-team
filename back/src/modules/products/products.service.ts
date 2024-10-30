import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>
  ) {}

  async createProduct(createProductDto: CreateProductDto) {
    try {
      const newProduct = this.productsRepository.create(createProductDto);
      return await this.productsRepository.save(newProduct);
    } catch (error) {
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async findAll() {
    try {
      return await this.productsRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Error al obtener la lista de productos');
    }
  }

  async findOneById(id: string): Promise<Product> {
    try {
      console.log(`Buscando producto id ${id}`);
      const product = await this.productsRepository.findOne({ where: { id } });

      if (!product) {
        console.log(`Producto id ${id} no encontrado`);
        throw new NotFoundException(`Producto id ${id} no encontrado`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al buscar el producto con id ${id}`);
    }
  }

  async updateProduct(id: string, updateProductDto: UpdateProductDto) {
    try {
      const product = await this.findOneById(id); 

      Object.assign(product, updateProductDto);
      return await this.productsRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al actualizar el producto con id ${id}`);
    }
  }

  async removeProduct(id: string) {
    try {
      const product = await this.findOneById(id); 

      product.Activo = false;
      return await this.productsRepository.save(product);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(`Error al eliminar el producto con id ${id}`);
    }
  }
}
