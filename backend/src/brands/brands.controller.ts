import { Controller, Get, Param } from '@nestjs/common';
import { BrandsService } from './brands.service';

@Controller('api/brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Get(':name')
  async getByName(@Param('name') name: string) {
    return this.brandsService.findByName(name);
  }
}
