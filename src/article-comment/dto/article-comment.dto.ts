import { Expose, Type } from "class-transformer"
import { ArticleDto } from "src/article/dto/article.dto";
import { UserDto } from "src/user/dto/user.dto";

export class ArticleCommentDto {
    @Expose()
    id: number;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    @Type(() => ArticleDto)
    article: ArticleDto;

    @Expose()
    @Type(() => UserDto)
    author: UserDto;
}