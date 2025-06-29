import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findByName(name: string) {
    return this.prisma.category.findUnique({
      where: { name },
    });
  }
}
