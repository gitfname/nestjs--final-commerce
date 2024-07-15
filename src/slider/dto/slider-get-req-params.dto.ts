import { IsNumberString, MaxLength } from "class-validator"

export class SliderGetReqParams {
    @IsNumberString({ no_symbols: true })
    @MaxLength(5)
    id: string;
}