import { ArrayMaxSize, IsArray, IsOptional, IsString, MaxLength, ValidateNested } from "class-validator"
import { CreateSlideDto } from "./create-slide.dto"
import { Type } from "class-transformer";

export class UpdateSliderDto {
    @IsOptional()
    @IsString()
    @MaxLength(120)
    name: string;

    @IsOptional()
    @IsArray()
    @ArrayMaxSize(3)
    @ValidateNested({ each: true })
    @Type(() => CreateSlideDto)
    slides: CreateSlideDto[];
}