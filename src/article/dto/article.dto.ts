import { Expose, Type } from "class-transformer"
import { CategoryDto } from "src/category/dto/category.dto";
import { UserDto } from "src/user/dto/user.dto";

export class ArticleDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    description: string;

    @Expose()
    content: string;

    @Expose()
    coverImage: string;

    @Expose()
    thumbnailImage: string;

    @Expose()
    @Type(() => CategoryDto)
    category: CategoryDto;

    @Expose()
    @Type(() => UserDto)
    author: UserDto;
}