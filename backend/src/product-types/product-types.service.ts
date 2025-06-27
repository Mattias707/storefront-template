import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductTypesService {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string) {
    return this.prisma.productType.findUnique({
      where: { name },
    });
  }
}
