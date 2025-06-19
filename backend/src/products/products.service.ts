import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import slugify from 'slugify';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDTO) {
    const { categories, ...productData } = data;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        categories: {
          connectOrCreate: categories.map((name) => ({
            where: { name },
            create: { name },
          })),
        },
      },
      include: { categories: true },
    });

    const slug = slugify(product.name, { lower: true });
    const sku = `sku-${Date.now()}`;

    return this.prisma.product.update({
      where: { id: product.id },
      data: { slug, sku },
      include: { categories: true },
    });
  }

  findMany(category?: string) {
    if (category) {
      return this.prisma.product.findMany({
        where: {
          categories: {
            some: {
              name: category,
            },
          },
        },
        include: { categories: true },
      });
    }

    return this.prisma.product.findMany({
      include: { categories: true },
    });
  }

  findUnique(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    });
  }

  async update(id: number, data: UpdateProductDTO) {
    const { categories, ...productData } = data;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(categories && {
          categories: {
            set: [],
            connectOrCreate: categories.map((name) => ({
              where: { name },
              create: { name },
            })),
          },
        }),
      },
      include: { categories: true },
    });
  }

  delete(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
