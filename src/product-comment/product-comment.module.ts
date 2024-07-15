import { Module } from '@nestjs/common';
import { ProductCommentService } from './product-comment.service';
import { ProductCommentController } from './product-comment.controller';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProductComment } from './entities/product-comment.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductComment]),
    UserModule,
    ProductModule
  ],
  controllers: [ProductCommentController],
  providers: [ProductCommentService],
})
export class ProductCommentModule { }
