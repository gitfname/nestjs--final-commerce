import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common"
import { ProductService } from "./product.service";
import { Product } from "./entity/product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductGetReqParams } from "./dto/product-get-req-params.dto";
import { ProductDeleteReqParams } from "./dto/product-delete-req-params.dto";
import { ProductUpdateReqParams } from "./dto/product-update-req-params.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/rbac/roles.decoator";
import { ERoles } from "src/rbac/user-roles.enum";

@Controller("products")
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) { }

    @Post()
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return await this.productService.createProduct(createProductDto)
    }

    @Get()
    async findAll(): Promise<Product[]> {
        return await this.productService.findAllProducts()
    }

    @Get(":id")
    async findOneById(@Param() params: ProductGetReqParams): Promise<Product> {
        return await this.productService.findOneById(+params.id)
    }

    @Patch(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async updateOneById(@Param() params: ProductUpdateReqParams, @Body() updateProductDto: UpdateProductDto): Promise<void> {
        await this.productService.updateProduct(+params.id, updateProductDto)
    }

    @Delete(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async deleteOneById(@Param() params: ProductDeleteReqParams): Promise<void> {
        await this.productService.deleteProduct(+params.id)
    }
}