import { Expose, Type } from "class-transformer"
import { ProductDto } from "src/product/dto/product.dto";
import { UserDto } from "src/user/dto/user.dto";

export class ProductCommentDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    @Type(() => ProductDto)
    product: ProductDto;

    @Expose()
    @Type(() => UserDto)
    author: UserDto;
}