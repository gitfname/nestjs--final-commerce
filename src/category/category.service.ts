import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CategoryEntity as Category } from "./category.entity"
import { CreateCategoryDto } from "./dto/CreateCategory.dto"
import { UpdateCommerceCategoryDto } from "./dto/UpdateCommerceCategory.dto"

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>
    ) { }

    async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category()

        category.title = createCategoryDto.title
        category.description = createCategoryDto.description

        if (typeof createCategoryDto.parent === "number") {
            category.parent = await this.findOneById(createCategoryDto.parent)
        }

        if (typeof createCategoryDto.children === "number") {
            category.children = [await this.findOneById(createCategoryDto.children)]
        }

        await this.categoryRepository.save(category)

        return category
    }

    async findAllCategories(): Promise<Category[]> {
        return this.categoryRepository.find({
            relations: {
                parent: true,
                children: { children: { children: true } }
            }
        })
    }

    async findOneById(id: number): Promise<Category> {
        const category = await this.categoryRepository.findOne({
            where: { id },
            relations: {
                parent: true,
                children: true
            }
        })
        if (!category) throw new NotFoundException()
        return category
    }

    async updateCategory(id: number, updateCategoryDto: UpdateCommerceCategoryDto): Promise<Category> {
        const category = await this.findOneById(id)

        if (updateCategoryDto.title) category.title = updateCategoryDto.title
        if (updateCategoryDto.description) category.description = updateCategoryDto.description
        if (typeof updateCategoryDto.parent === "number") {
            category.parent = await this.findOneById(updateCategoryDto.parent)
        }

        await this.categoryRepository.save(category)

        return category
    }

    async removeParentChildRelation(id: number): Promise<Category> {
        const category = await this.findOneById(id)
        category.parent = null
        await this.categoryRepository.save(category)
        return category
    }

    async deleteCategory(id: number): Promise<void> {
        await this.categoryRepository.delete({ id })
    }
}