import { Controller, Get, Param } from '@nestjs/common';
import { ProductTypesService } from './product-types.service';

@Controller('api/product-types')
export class ProductTypesController {
  constructor(private readonly productTypesService: ProductTypesService) {}

  @Get(':name')
  async getByName(@Param('name') name: string) {
    return this.productTypesService.findByName(name);
  }
}
