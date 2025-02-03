import { createZodDto } from '@anatine/zod-nestjs';
import { createProductSchema } from '../../../../../packages/schemas/schema';

export class CreateProductDto extends createZodDto(createProductSchema) {}
