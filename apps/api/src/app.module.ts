import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma.service';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [ConfigModule.forRoot(), ProductModule],
  controllers: [AppController, ProductController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
