import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { updateProductDTO } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private prisma: PrismaService) {}

  // Create new product
  @Post()
  async create(data: CreateProductDTO) {
    try {
      const product = await this.prisma.product.create({
        data,
      });
      return product;
    } catch (e) {
      throw new HttpException(
        `Failed to create product: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get all products
  @Get()
  async findMany() {
    try {
      const products = await this.prisma.product.findMany();
      return products;
    } catch (e) {
      throw new HttpException(
        `Failed to feth products: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Get a product by id
  @Get(':id')
  async findUnique(@Param('id', ParseIntPipe) id: string) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: Number(id) },
      });
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

  // Update a product by id
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDTO: updateProductDTO,
  ) {
    try {
      const updatedProduct = await this.prisma.product.update({
        where: { id: Number(id) },
        data: updateProductDTO,
      });
      return updatedProduct;
    } catch (e) {
      throw new HttpException(
        `Failed to update product: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Delete a product by id
  @Delete(':id')
  @HttpCode(204) // No content
  async delete(@Param('id') id: string) {
    try {
      const deletedProduct = await this.prisma.product.delete({
        where: { id: Number(id) },
      });
      return deletedProduct;
    } catch (e) {
      throw new HttpException(
        `Failed to delete product: ${e.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
