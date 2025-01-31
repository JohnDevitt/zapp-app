import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  store: string;
}

export class UpdateProductDto {
  @ApiProperty({ required: false })
  quantity?: number;

  @ApiProperty({ required: false })
  sku?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  store?: string;
}
