import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por su ID' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  findOneById(@Param('id') id: string) {
    return this.productsService.findOneById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto existente' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un producto' })
  @ApiParam({ name: 'id', description: 'ID del producto' })
  removeProduct(@Param('id') id: string) {
    return this.productsService.removeProduct(id);
  }
}
