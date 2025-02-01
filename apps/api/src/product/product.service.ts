import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';
//import * as fs from 'fs';
//import * as fastCsv from 'fast-csv';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return this.prisma.product.findUniqueOrThrow({
      where: { id },
    });
  }

  async create(productData: CreateProductDto) {
    return this.prisma.product.create({
      data: productData,
    });
  }

  async update(id: string, productData: CreateProductDto) {
    return this.prisma.product.update({
      where: { id },
      data: productData,
    });
  }

  async delete(id: string) {
    await this.prisma.product.delete({
      where: { id },
    });
  }

  // Bulk upload products from a CSV file
  async bulkUpload(filePath: string) {
    await this.prisma.product.deleteMany(); // Reset DB

    const products: {
      quantity: number;
      sku: string;
      description: string;
      store: string;
    }[] = [];

    return;
  }
}
