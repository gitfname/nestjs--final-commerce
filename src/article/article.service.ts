import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entities/article.entity';
import { UserService } from 'src/user/user.service';
import { ArticleNotFoundException } from 'src/exceptions/ArticleNotFoundException';
import { WeblogCategoryService } from 'src/weblog-category/weblog-category.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly articleRepository: Repository<Article>,
    private readonly userService: UserService,
    private readonly blogService: WeblogCategoryService
  ) { }

  async create(userId: number, createArticleDto: CreateArticleDto): Promise<Article> {
    const author = await this.userService.findOneById(userId)
    const category = await this.blogService.findOne(createArticleDto.category)
    return await this.articleRepository.save({ ...createArticleDto, author, category })
  }

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find({ relations: { author: true, category: true } })
  }

  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: {
        category: true,
        author: true
      }
    })
    if (!article) throw new ArticleNotFoundException()
    return article
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<void> {
    const category = await this.blogService.findOne(updateArticleDto.category)
    await this.articleRepository.update({ id }, { ...updateArticleDto, category })
  }

  async remove(id: number): Promise<void> {
    await this.articleRepository.delete(id)
  }
}
