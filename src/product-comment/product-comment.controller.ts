import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ProductCommentService } from './product-comment.service';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { Request } from 'express';
import { ProductComment } from './entities/product-comment.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { plainToClass } from 'class-transformer';
import { ProductCommentDto } from './dto/product-comment.dto';
import { IsAuthorOfProductComment } from 'src/guards/is-author-of-productComment.guard';

@Controller('product-comments')
export class ProductCommentController {
  constructor(private readonly productCommentService: ProductCommentService) { }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Req() req: Request, @Body() createProductCommentDto: CreateProductCommentDto): Promise<ProductComment> {
    return await this.productCommentService.create(req["user"]["sub"], createProductCommentDto);
  }

  @Get()
  async findAll(): Promise<ProductCommentDto[]> {
    return plainToClass(ProductCommentDto, await this.productCommentService.findAll(), { excludeExtraneousValues: true });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProductCommentDto> {
    return plainToClass(ProductCommentDto, await this.productCommentService.findOne(+id), { excludeExtraneousValues: true });
  }

  @Patch(':id')
  @UseGuards(AuthGuard, IsAuthorOfProductComment)
  async update(@Param('id') id: string, @Body() updateProductCommentDto: UpdateProductCommentDto): Promise<void> {
    await this.productCommentService.update(+id, updateProductCommentDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, IsAuthorOfProductComment)
  async remove(@Param('id') id: string): Promise<void> {
    await this.productCommentService.remove(+id);
  }
}
