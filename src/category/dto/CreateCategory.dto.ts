import { IsString, IsOptional, IsInt, MaxLength, Max, Allow } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateCategoryDto {
    @ApiProperty({ example: "Fruits", description: "name of the category", maxLength: 100, required: true })
    @IsString()
    @MaxLength(100)
    title: string;

    @ApiProperty({ example: "nice fruits in the world", description: "description of the category", maxLength: 200, required: true })
    @IsString()
    @MaxLength(200)
    description: string;

    @ApiProperty({ example: 1, description: "parent of the category", maximum: 999999, required: false })
    @IsOptional()
    @IsInt()
    @Max(999999)
    parent?: number;

    @ApiProperty({ example: 1, description: "child of the category", maximum: 999999, required: false })
    @IsOptional()
    @IsInt()
    @Max(999999)
    children?: number;
}