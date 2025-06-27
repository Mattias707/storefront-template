import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { UpdateProductDTO } from './dto/update-product.dto';
import slugify from 'slugify';
import { every } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  /* ─────────────────────────── CREATE ─────────────────────────── */

  async create(data: CreateProductDTO) {
    const { categories = [], productType, brand, ...productData } = data;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        categories: {
          connectOrCreate: categories.map((category) => ({
            where: { name: category },
            create: { name: category, label: category },
          })),
        },
        productType: {
          connectOrCreate: {
            where: { name: productType },
            create: { name: productType, label: productType },
          },
        },
        brand: {
          connectOrCreate: {
            where: { name: brand },
            create: { name: brand, label: brand },
          },
        },
      },
      include: { categories: true, productType: true, brand: true },
    });

    const slug = slugify(product.name, { lower: true });
    const sku = `sku-${Date.now()}`;

    return this.prisma.product.update({
      where: { id: product.id },
      data: { slug, sku },
      include: { categories: true },
    });
  }

  /* ─────────────────────────── FETCH (ALL / BY CATEGORY, BRAND & PRODUCT TYPE) ─────────────────────────── */

  async findMany({
    category,
    productType,
    brand,
  }: {
    category?: string;
    productType?: string;
    brand?: string;
  }) {
    const filters: any = {};

    if (category) {
      filters.categories = {
        some: { name: category },
      };
    }

    if (productType) {
      filters.productType = { name: productType };
    }

    if (brand) {
      filters.brand = { name: brand };
    }

    try {
      return await this.prisma.product.findMany({
        where: filters,
        include: {  categories: true, productType: true, brand: true},
      });
    } catch (error) {
      throw new Error(`Error fetching products: ${error.message}`);
    }
  }

  /* ─────────────────────────── FETCH (ONE) ─────────────────────────── */

  findUnique(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { brand: true, categories: true },
    });
  }

  /* ─────────────────────────── UPDATE ─────────────────────────── */

  async update(id: number, data: UpdateProductDTO) {
    const { categories, productType, brand, ...productData } = data;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...productData,
        ...(categories && {
          categories: {
            set: [],
            connectOrCreate: categories.map((category) => ({
              where: { name: category },
              create: { name: category, label: category },
            })),
          },
        }),
        ...(productType && {
          productType: {
            connectOrCreate: {
              where: { name: productType },
              create: { name: productType, label: productType },
            },
          },
        }),
        ...(brand && {
          brand: {
            connectOrCreate: {
              where: { name: brand },
              create: { name: brand, label: brand },
            },
          },
        }),
      },
      include: { categories: true, productType: true, brand: true },
    });
  }

  /* ─────────────────────────── DELETE ─────────────────────────── */

  delete(id: number) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
