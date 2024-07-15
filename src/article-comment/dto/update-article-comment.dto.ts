import { PartialType } from '@nestjs/swagger';
import { CreateArticleCommentDto } from './create-article-comment.dto';

export class UpdateArticleCommentDto extends PartialType(CreateArticleCommentDto) {}
