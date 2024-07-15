import { Module } from '@nestjs/common';
import { WeblogCategoryService } from './weblog-category.service';
import { WeblogCategoryController } from './weblog-category.controller';
import { TypeOrmModule } from "@nestjs/typeorm"
import { WeblogCategoryEntity } from './entities/weblog-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WeblogCategoryEntity])],
  controllers: [WeblogCategoryController],
  providers: [WeblogCategoryService],
  exports: [WeblogCategoryService]
})
export class WeblogCategoryModule { }
