import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ArticleCommentService } from './article-comment.service';
import { CreateArticleCommentDto } from './dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from './dto/update-article-comment.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { plainToClass } from 'class-transformer';
import { ArticleCommentDto } from './dto/article-comment.dto';
import { IsAuthorOfArticleComment } from 'src/guards/is-author-of-articleComment.guard';

@Controller('article-comments')
export class ArticleCommentController {
  constructor(private readonly articleCommentService: ArticleCommentService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req: Request, @Body() createArticleCommentDto: CreateArticleCommentDto): Promise<ArticleCommentDto> {
    return plainToClass(ArticleCommentDto, await this.articleCommentService.create(req["user"]["sub"], createArticleCommentDto), { excludeExtraneousValues: true });
  }

  @Get()
  async findAll(): Promise<ArticleCommentDto[]> {
    return plainToClass(ArticleCommentDto, await this.articleCommentService.findAll(), { excludeExtraneousValues: true });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ArticleCommentDto> {
    return plainToClass(ArticleCommentDto, await this.articleCommentService.findOne(+id), { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @UseGuards(AuthGuard, IsAuthorOfArticleComment)
  async update(@Param('id') id: string, @Body() updateArticleCommentDto: UpdateArticleCommentDto): Promise<void> {
    await this.articleCommentService.update(+id, updateArticleCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, IsAuthorOfArticleComment)
  async remove(@Param('id') id: string): Promise<void> {
    await this.articleCommentService.remove(+id);
  }
}
