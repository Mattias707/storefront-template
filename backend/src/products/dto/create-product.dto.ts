import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  imageURL: string;
}
