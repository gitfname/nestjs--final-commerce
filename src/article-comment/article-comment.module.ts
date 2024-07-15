import { Module } from '@nestjs/common';
import { ArticleCommentService } from './article-comment.service';
import { ArticleCommentController } from './article-comment.controller';
import { TypeOrmModule } from "@nestjs/typeorm"
import { ArticleComment } from './entities/article-comment.entity';
import { UserModule } from 'src/user/user.module';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleComment]),
    UserModule,
    ArticleModule
  ],
  controllers: [ArticleCommentController],
  providers: [ArticleCommentService],
})
export class ArticleCommentModule { }
