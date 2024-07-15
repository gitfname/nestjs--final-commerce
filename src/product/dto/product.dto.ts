import { Expose } from "class-transformer"

export class ProductDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    description: string;

    @Expose()
    technicalReview?: string;

    @Expose()
    price: number;

    @Expose()
    discount: number;

    @Expose()
    totalPrice: number;

    @Expose()
    thumbnailImage: string;

    @Expose()
    images: unknown[];

    @Expose()
    isPublic: boolean;

    @Expose()
    isInSale: boolean;

    @Expose()
    inStock: number;

    @Expose()
    orderPoint: number;
}