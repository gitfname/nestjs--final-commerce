import { IsString, IsOptional, IsInt, MaxLength, Max } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class UpdateCommerceCategoryDto {
    @ApiProperty({ example: "Fruits", description: "name of the category", required: false, maxLength: 100 })
    @IsOptional()
    @IsString()
    @MaxLength(100)
    title: string;

    @ApiProperty({ example: "Fruits", description: "description of the category", required: false, maxLength: 200 })
    @IsOptional()
    @IsString()
    @MaxLength(200)
    description: string;

    @ApiProperty({ example: 1, description: "parent category", required: false, maximum: 999999 })
    @IsOptional()
    @IsInt()
    @Max(999999)
    parent?: number;
}