import { IsNumberString, MaxLength } from "class-validator"

export class AddProductToCouponReqParamsDto {
    @IsNumberString({no_symbols: true})
    @MaxLength(5)
    productId: string;

    @IsNumberString({no_symbols: true})
    @MaxLength(5)
    couponId: string;
}