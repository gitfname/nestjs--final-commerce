import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/rbac/roles.decoator';
import { ERoles } from 'src/rbac/user-roles.enum';
import { Request } from 'express';
import { plainToClass } from "class-transformer"
import { ArticleDto } from './dto/article.dto';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @Post()
  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Req() req: Request, @Body() createArticleDto: CreateArticleDto): Promise<ArticleDto> {
    return plainToClass(ArticleDto, await this.articleService.create(req["user"]["sub"], createArticleDto), { excludeExtraneousValues: true });
  }

  @Get()
  async findAll(): Promise<ArticleDto[]> {
    return plainToClass(ArticleDto, await this.articleService.findAll(), { excludeExtraneousValues: true });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ArticleDto> {
    return plainToClass(ArticleDto, await this.articleService.findOne(+id), { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto): Promise<void> {
    await this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async remove(@Param('id') id: string): Promise<void> {
    await this.articleService.remove(+id);
  }
}
