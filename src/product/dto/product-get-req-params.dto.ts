import { IsNumberString, MaxLength } from "class-validator"

export class ProductGetReqParams {
    @IsNumberString()
    @MaxLength(5)
    id: string;
}