import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { AppDataSource } from './data-source';
import { ProductController } from './product/product.controller';

@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options), ProductModule],
  controllers: [AppController, ProductController],
  providers: [AppService],
})
export class AppModule {}
