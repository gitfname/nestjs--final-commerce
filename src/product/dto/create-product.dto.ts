import { Type } from "class-transformer";
import { IsString, MaxLength, IsInt, Max, Min, IsArray, ValidateNested, ArrayMaxSize, ArrayNotEmpty, IsBoolean, IsOptional } from "class-validator"

class ImagesDto {
    @IsString()
    @MaxLength(400)
    image: string;
}

export class CreateProductDto {
    @IsString()
    @MaxLength(160)
    name: string;

    @IsString()
    @MaxLength(9000)
    description: string;

    @IsString()
    @MaxLength(400)
    thumbnailImage: string;

    @IsArray()
    @ArrayNotEmpty()
    @ArrayMaxSize(4)
    @ValidateNested()
    @Type(() => ImagesDto)
    images: ImagesDto[];

    @IsInt()
    @Max(20_000_000)
    @Min(10_000)
    price: number;

    @IsInt()
    @Max(100)
    @Min(0)
    discount: number;

    @IsInt()
    @Max(30_000)
    @Min(0)
    orderPoint: number;

    @IsBoolean()
    isPublic: boolean;

    @IsBoolean()
    isInSale: boolean;

    @IsInt()
    @Max(30_000)
    @Min(0)
    inStock: number;

    @IsOptional()
    @IsString()
    @MaxLength(13000)
    technicalReview?: string;

    @IsInt()
    @Max(999999)
    @Min(1)
    category: number;
}