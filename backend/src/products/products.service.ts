import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { updateProductDTO } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  // prisma db
  constructor(private prisma: PrismaService) {}

  create(data: CreateProductDTO) {
    // Save the products in the db
    return this.prisma.product.create({ data });
  }

  findMany() {
    // Fetch the products from the db
    return this.prisma.product.findMany();
  }

  findUnique(id: number) {
    // Fetch one product
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  update(id: number, data: updateProductDTO) {
    // Update product
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    // Delete product
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
