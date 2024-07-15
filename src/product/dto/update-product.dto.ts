import { Type } from "class-transformer";
import { IsString, MaxLength, IsInt, Max, Min, IsArray, ValidateNested, ArrayMaxSize, ArrayNotEmpty, IsBoolean, IsOptional } from "class-validator"

class ImagesDto {
    @IsString()
    @MaxLength(400)
    image: string;
}

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @MaxLength(160)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(9000)
    description: string;

    @IsOptional()
    @IsString()
    @MaxLength(400)
    thumbnailImage: string;

    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @ArrayMaxSize(4)
    @ValidateNested()
    @Type(() => ImagesDto)
    images: ImagesDto[];

    @IsOptional()
    @IsInt()
    @Max(20_000_000)
    @Min(10_000)
    price: number;

    @IsOptional()
    @IsInt()
    @Max(100)
    @Min(0)
    discount: number;

    @IsOptional()
    @IsInt()
    @Max(30_000)
    @Min(0)
    orderPoint: number;

    @IsOptional()
    @IsBoolean()
    isPublic: boolean;

    @IsOptional()
    @IsBoolean()
    isInSale: boolean;

    @IsOptional()
    @IsBoolean()
    inStock: number;

    @IsOptional()
    @IsString()
    @MaxLength(13000)
    technicalReview?: string;

    @IsOptional()
    @IsInt()
    @Max(999999)
    @Min(1)
    category: number;
}