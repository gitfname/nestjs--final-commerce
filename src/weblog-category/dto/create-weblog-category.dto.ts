import { IsString, MaxLength } from "class-validator"

export class CreateWeblogCategoryDto {
    @IsString()
    @MaxLength(100)
    title: string;

    @IsString()
    @MaxLength(200)
    description: string;

    @IsString()
    @MaxLength(400)
    image: string;
}
