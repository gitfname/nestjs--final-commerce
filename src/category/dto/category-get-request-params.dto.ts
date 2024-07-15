import { IsNumberString, MaxLength } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CategoryGetRequestParamsDto {
    @ApiProperty({ example: 1, description: "id of the category" })
    @IsNumberString()
    @MaxLength(6)
    id: string;
}