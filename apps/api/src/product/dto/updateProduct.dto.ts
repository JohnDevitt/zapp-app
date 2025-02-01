import { createZodDto } from '@anatine/zod-nestjs';
import { updateProductSchema } from '../../../../../packages/schemas/schema';

export class CreateProductDto extends createZodDto(updateProductSchema) {}
