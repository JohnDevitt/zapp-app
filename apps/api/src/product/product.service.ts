import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import * as fs from 'fs';
import * as fastCsv from 'fast-csv';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOneOrFail({ where: { id } });
  }

  async create(
    productData: Pick<Product, 'quantity' | 'sku' | 'description' | 'store'>,
  ): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async update(id: string, productData: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, productData);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }

  async bulkUpload(filePath: string): Promise<void> {
    await this.productRepository.clear(); // Reset DB

    const products: Product[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(fastCsv.parse({ headers: true }))
        .on('data', async (row) => {
          const product = {
            quantity: Number(row.quantity),
            sku: row.sku,
            description: row.description,
            store: row.store,
          } as Product;
          products.push(product);
        })
        .on('end', async () => {
          await this.productRepository.save(products);
          fs.unlinkSync(filePath); // Clean up file
          resolve();
        })
        .on('error', (error) => reject(error));
    });
  }
}
