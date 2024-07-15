import { IsString, MaxLength } from "class-validator"

export class CreateSlideDto {
    @IsString()
    @MaxLength(120)
    alt: string;

    @IsString()
    @MaxLength(400)
    img: string;

    @IsString()
    @MaxLength(400)
    link: string;
}