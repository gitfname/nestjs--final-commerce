import { IsNumberString, MaxLength } from "class-validator"

export class ProductUpdateReqParams {
    @IsNumberString()
    @MaxLength(5)
    id: string;
}