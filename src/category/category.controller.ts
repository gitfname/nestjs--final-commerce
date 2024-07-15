import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common"
import { CategoryService } from "./category.service"
import { CategoryDto } from "./dto/category.dto"
import { CategoryGetRequestParamsDto } from "./dto/category-get-request-params.dto"
import { CreateCategoryDto } from "./dto/CreateCategory.dto"
import { AuthGuard } from "src/guards/auth.guard"
import { RoleGuard } from "src/guards/role.guard"
import { ERoles } from "src/rbac/user-roles.enum"
import { Roles } from "src/rbac/roles.decoator"
import { CategoryPutRequestParamsDto } from "./dto/category-put-request-params.dto"
import { UpdateCommerceCategoryDto } from "./dto/UpdateCommerceCategory.dto"
import { CategoryDeleteRequestParamsDto } from "./dto/category-delete-request-params.dto"
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger"

@ApiTags("product categories")
@Controller("categories")
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @ApiOperation({ summary: "create category" })
    @ApiResponse({ status: "2XX", type: CategoryDto })
    @Post()
    @Roles(ERoles.Admin, ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.createCategory(createCategoryDto)
    }

    @ApiOperation({ summary: "get all categories in raw mode" })
    @ApiResponse({ status: "2XX", type: CategoryDto, isArray: true })
    @Get()
    async getAllCategories(): Promise<CategoryDto[]> {
        return await this.categoryService.findAllCategories()
    }

    @ApiOperation({ summary: "get all categories is tree mode" })
    @ApiResponse({ status: "2XX", type: CategoryDto, isArray: true })
    @Get("tree")
    async getAllCategoriesInTreeMode(): Promise<CategoryDto[]> {
        const categories = await this.categoryService.findAllCategories()
        return categories.filter(category => category.parent === null)
    }

    @ApiOperation({ summary: "get single category" })
    @ApiResponse({ status: "2XX", type: CategoryDto, })
    @Get(":id")
    async findOne(@Param() params: CategoryGetRequestParamsDto): Promise<CategoryDto> {
        return await this.categoryService.findOneById(+params.id)
    }

    @ApiOperation({ summary: "update single category" })
    @ApiResponse({ status: "2XX", type: CategoryDto })
    @Put(":id")
    @Roles(ERoles.Admin, ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    async updateCategory(@Param() params: CategoryPutRequestParamsDto, @Body() updateCategoryDto: UpdateCommerceCategoryDto): Promise<CategoryDto> {
        return await this.categoryService.updateCategory(+params.id, updateCategoryDto)
    }

    @ApiOperation({ summary: "delete relation between sub-category and its parent" })
    @ApiResponse({ status: "2XX", type: CategoryDto })
    @Delete("delete-parent-child-relation/:id")
    @Roles(ERoles.Admin, ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    async deleteParentChildRelation(@Param() params: CategoryGetRequestParamsDto): Promise<void> {
        await this.categoryService.removeParentChildRelation(+params.id)
    }

    @ApiOperation({ summary: "delete category" })
    @ApiResponse({ status: "2XX" })
    @Delete(":id")
    @Roles(ERoles.Admin, ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    async deleteCategory(@Param() params: CategoryDeleteRequestParamsDto): Promise<void> {
        await this.categoryService.deleteCategory(+params.id)
    }
}