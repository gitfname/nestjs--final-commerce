import { IsNumberString, MaxLength } from "class-validator"

export class DeleteProductFromCouponReqParamsDto {
    @IsNumberString({no_symbols: true})
    @MaxLength(5)
    productId: string;
}