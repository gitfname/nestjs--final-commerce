import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm/repository/Repository"
import { Product } from "./entity/product.entity"
import { CreateProductDto } from "./dto/create-product.dto"
import { CategoryService } from "src/category/category.service"
import { ProductNotFoundException } from "src/exceptions/ProductNotFoundException"
import { UpdateProductDto } from "./dto/update-product.dto"

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        private readonly categoryService: CategoryService
    ) { }

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const category = await this.categoryService.findOneById(createProductDto.category)

        const product = new Product()

        product.name = createProductDto.name
        product.description = createProductDto.description
        product.technicalReview = createProductDto.technicalReview
        product.price = createProductDto.price
        product.discount = createProductDto.discount
        product.orderPoint = createProductDto.orderPoint
        product.thumbnailImage = createProductDto.thumbnailImage
        product.inStock = createProductDto.inStock
        product.isPublic = createProductDto.isPublic
        product.isInSale = createProductDto.isInSale
        product.images = createProductDto.images
        product.category = category

        await this.productRepository.save(product)

        return product
    }

    async findAllProducts(): Promise<Product[]> {
        return await this.productRepository.find()
    }

    async findOneById(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id })
        if (!product) throw new ProductNotFoundException()
        return product
    }

    async updateProduct(id: number, updateProductDto: UpdateProductDto): Promise<void> {
        if (updateProductDto.category) {
            const category = await this.categoryService.findOneById(updateProductDto.category)
            await this.productRepository.update({ id }, { ...updateProductDto, category })
            return
        }

        const { category, ...updateProduct } = updateProductDto
        await this.productRepository.update({ id }, updateProduct)
    }

    async deleteProduct(id: number): Promise<void> {
        await this.productRepository.delete(id)
    }
}