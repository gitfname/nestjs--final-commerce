import { Type } from "class-transformer";
import { IsString, MaxLength, IsNumber, Max, Min, MinLength, IsNumberString } from "class-validator"

export class CreateArticleDto {
    @IsString()
    @MaxLength(120)
    @MinLength(1)
    title: string;

    @IsString()
    @MaxLength(900)
    @MinLength(1)
    description: string;

    @IsString()
    @MaxLength(20000)
    @MinLength(1)
    content: string;

    @IsString()
    @MaxLength(400)
    thumbnailImage: string;

    @IsString()
    @MaxLength(400)
    coverImage: string;

    @IsNumber()
    @Max(999999)
    @Min(1)
    category: number;
}
