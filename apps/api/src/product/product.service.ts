import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
//import * as fs from 'fs';
//import * as fastCsv from 'fast-csv';
import { Product } from '@prisma/client';

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

  // Create a new product
  async create(
    productData: Pick<Product, 'quantity' | 'sku' | 'description' | 'store'>,
  ) {
    return this.prisma.product.create({
      data: productData,
    });
  }

  // Update an existing product
  async update(
    id: string,
    productData: Partial<
      Pick<Product, 'quantity' | 'sku' | 'description' | 'store'>
    >,
  ) {
    return this.prisma.product.update({
      where: { id },
      data: productData,
    });
  }

  // Delete a product
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