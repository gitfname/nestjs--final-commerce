import { Injectable } from '@nestjs/common';
import { CreateArticleCommentDto } from './dto/create-article-comment.dto';
import { UpdateArticleCommentDto } from './dto/update-article-comment.dto';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm';
import { ArticleComment } from './entities/article-comment.entity';
import { UserService } from 'src/user/user.service';
import { ArticleService } from 'src/article/article.service';
import { ArticleCommentNotFoundException } from 'src/exceptions/ArticleCommentNotFoundException copy';

@Injectable()
export class ArticleCommentService {
  constructor(
    @InjectRepository(ArticleComment) private readonly articleCommentRepository: Repository<ArticleComment>,
    private readonly userService: UserService,
    private readonly articleService: ArticleService
  ) { }

  async create(userId: number, createArticleDto: CreateArticleCommentDto): Promise<ArticleComment> {
    const article = await this.articleService.findOne(createArticleDto.article)
    const author = await this.userService.findOneById(userId)

    const articleComment = new ArticleComment()

    articleComment.title = createArticleDto.title
    articleComment.content = createArticleDto.content
    articleComment.article = article
    articleComment.author = author

    await this.articleCommentRepository.save(articleComment)

    return articleComment
  }

  async findAll(): Promise<ArticleComment[]> {
    return await this.articleCommentRepository.find({
      select: {
        id: true, title: true, content: true, author: { id: true, email: true, firstName: true },
        article: { id: true, title: true }
      },
      relations: {
        article: true,
        author: true
      }
    })
  }

  async findOne(id: number): Promise<ArticleComment> {
    const articleComment = await this.articleCommentRepository.findOne({
      where: { id },
      relations: {
        author: true,
        article: true
      }
    })
    if (!articleComment) throw new ArticleCommentNotFoundException()
    return articleComment
  }
  
  async findCommentsOfArticle(articleId: number): Promise<ArticleComment[]> {
    return await this.articleCommentRepository.findBy({
      article: { id: articleId }
    })
  }

  async update(id: number, updateArticleCommentDto: UpdateArticleCommentDto): Promise<void> {
    const { article, ...updateArticle } = updateArticleCommentDto
    await this.articleCommentRepository.update({ id }, updateArticle)
  }

  async remove(id: number): Promise<void> {
    await this.articleCommentRepository.delete(id)
  }
}
