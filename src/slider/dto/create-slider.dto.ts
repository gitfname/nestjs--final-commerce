import { IsArray, IsString, MaxLength, ValidateNested, ArrayMaxSize } from "class-validator"
import { CreateSlideDto } from "./create-slide.dto"
import { Type } from "class-transformer";

export class CreateSliderDto {
    @IsString()
    @MaxLength(120)
    name: string;

    @IsArray()
    @ArrayMaxSize(3)
    @ValidateNested({ each: true })
    @Type(() => CreateSlideDto)
    slides: CreateSlideDto[];
}