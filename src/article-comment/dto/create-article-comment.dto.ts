import { IsString, MaxLength, IsInt, Max, Min } from "class-validator"

export class CreateArticleCommentDto {
    @IsString()
    @MaxLength(140)
    title: string;

    @IsString()
    @MaxLength(900)
    content: string;

    @IsInt()
    @Max(99999)
    @Min(1)
    article: number;
}
