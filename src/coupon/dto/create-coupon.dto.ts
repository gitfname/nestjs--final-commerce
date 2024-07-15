import { IsInt, IsString, Max, MaxLength, Min, MinLength } from "class-validator"

export class CreateCouponDto {
    @IsString()
    @MaxLength(12)
    @MinLength(4)
    code: string;

    @IsInt()
    @Max(12)
    @Min(1)
    expiresInDays: number;
}
