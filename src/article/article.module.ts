import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Article } from './entities/article.entity';
import { UserModule } from 'src/user/user.module';
import { WeblogCategoryModule } from 'src/weblog-category/weblog-category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    UserModule,
    WeblogCategoryModule
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule { }
