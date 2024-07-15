import { IsNumberString, MaxLength } from "class-validator"

export class ProductDeleteReqParams {
    @IsNumberString()
    @MaxLength(5)
    id: string;
}