import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /* ─────────────────────────── CREATE ─────────────────────────── */

  @Post()
  async create(@Body() data: CreateProductDTO) {
    try {
      return await this.productsService.create(data);
    } catch (e) {
      throw new HttpException(
        `Failed to create product: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* ─────────────────────────── FETCH (ALL / BY CATEGORY, BRAND & PRODUCT TYPE) ─────────────────────────── */

  @Get()
  async findMany(
    @Query('category') category?: string,
    @Query('productType') productType?: string,
    @Query('brand') brand?: string,
  ) {
    try {
      return await this.productsService.findMany({
        category,
        productType,
        brand,
      });
    } catch (e) {
      throw new HttpException(
        `Failed to fetch products: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* ─────────────────────────── FETCH (ONE) ─────────────────────────── */

  @Get(':id')
  async findUnique(@Param('id', ParseIntPipe) id: number) {
    try {
      const product = await this.productsService.findUnique(id);
      if (!product) {
        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
      }
      return product;
    } catch (e) {
      throw new HttpException(
        `Failed to fetch product: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* ─────────────────────────── UPDATE ─────────────────────────── */

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDTO: UpdateProductDTO,
  ) {
    try {
      return await this.productsService.update(id, updateProductDTO);
    } catch (e) {
      throw new HttpException(
        `Failed to update product: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* ─────────────────────────── DELETE ─────────────────────────── */

  @Delete(':id')
  @HttpCode(204) // No content
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.productsService.delete(id);
    } catch (e) {
      throw new HttpException(
        `Failed to delete product: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
