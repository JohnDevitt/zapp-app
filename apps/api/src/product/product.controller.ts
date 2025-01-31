import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(
    @Body()
    productData: Pick<Product, 'quantity' | 'sku' | 'description' | 'store'>,
  ): Promise<Product> {
    return this.productService.create(productData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() productData: Omit<Partial<Product>, 'id'>,
  ): Promise<Product> {
    return this.productService.update(Number(id), productData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(Number(id));
  }

  @Post('bulk-upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          cb(null, `upload-${Date.now()}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async bulkUpload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ message: string }> {
    await this.productService.bulkUpload(file.path);
    return { message: 'Database reset and new data uploaded successfully' };
  }
}
