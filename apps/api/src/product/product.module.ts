import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [ProductService, PrismaService],
  exports: [ProductService],
})
export class ProductModule {}
