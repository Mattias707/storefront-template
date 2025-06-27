import { Controller, Get, Param } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get(':name')
  async getByName(@Param('name') name: string) {
    return this.categoriesService.findByName(name);
  }
}
