import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';
import {
  createProductSchema,
  Store,
} from '../../../../packages/schemas/schema';
import { z } from 'zod';

const parseProduct = (data: CreateProductDto) => {
  const quantity = Number(data.quantity);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const store = data.store as Store;

  try {
    return createProductSchema.parse({
      ...data,
      quantity,
      store,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

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

  async upload(filePath: string): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const createProductListSchema = z.array(createProductSchema);
    const products: z.infer<typeof createProductListSchema> = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(fastCsv.parse({ headers: true }))
        .on('data', (data) => {
          const product = parseProduct(data);
          products.push(product);
        })
        .on('end', () => {
          this.prisma.product
            .createMany({ data: products })
            .then(() => resolve())
            .catch(reject);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }
}
