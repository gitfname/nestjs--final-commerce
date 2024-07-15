import { Module } from "@nestjs/common"
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { TypeOrmModule } from "@nestjs/typeorm"
import { UserModule } from "src/user/user.module";
import { CategoryModule } from "src/category/category.module";
import { Product } from "./entity/product.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
        UserModule,
        CategoryModule
    ],
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService]
})
export class ProductModule { }