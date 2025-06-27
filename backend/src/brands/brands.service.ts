import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BrandsService {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string) {
    console.log('[BrandsService] Looking for:', name);
    return this.prisma.brand.findUnique({
      where: { name },
    });
  }
}
