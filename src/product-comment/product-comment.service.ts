import { Injectable } from '@nestjs/common';
import { CreateProductCommentDto } from './dto/create-product-comment.dto';
import { UpdateProductCommentDto } from './dto/update-product-comment.dto';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm';
import { ProductComment } from './entities/product-comment.entity';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { ProductCommentNotFoundException } from 'src/exceptions/ProductCommentNotFoundException';

@Injectable()
export class ProductCommentService {
  constructor(
    @InjectRepository(ProductComment) private readonly productCommentRepository: Repository<ProductComment>,
    private readonly userService: UserService,
    private readonly productService: ProductService
  ) { }

  async create(userId: number, createProductCommentDto: CreateProductCommentDto): Promise<ProductComment> {
    const product = await this.productService.findOneById(createProductCommentDto.product)
    const author = await this.userService.findOneById(userId)

    const productComment = new ProductComment()

    productComment.title = createProductCommentDto.title
    productComment.content = createProductCommentDto.content
    productComment.product = product
    productComment.author = author

    await this.productCommentRepository.save(productComment)

    return productComment
  }

  async findAll(): Promise<ProductComment[]> {
    return await this.productCommentRepository.find({
      select: {
        id: true, title: true, content: true, author: { id: true, email: true, firstName: true },
        product: { id: true, name: true }
      },
      relations: {
        product: true,
        author: true
      }
    })
  }

  async findOne(id: number): Promise<ProductComment> {
    const productComment = await this.productCommentRepository.findOne({
      where: { id },
      relations: {
        author: true,
        product: true
      }
    })
    if (!productComment) throw new ProductCommentNotFoundException()
    return productComment
  }

  async findCommentsOfProduct(productId: number): Promise<ProductComment[]> {
    return await this.productCommentRepository.findBy({
      product: { id: productId }
    })
  }

  async update(id: number, updateProductCommentDto: UpdateProductCommentDto): Promise<void> {
    const { product, ...updateProduct } = updateProductCommentDto
    await this.productCommentRepository.update({ id }, updateProduct)
  }

  async remove(id: number): Promise<void> {
    await this.productCommentRepository.delete(id)
  }
}
