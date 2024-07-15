import { IsString, MaxLength } from "class-validator"

export class CreateSiteinfoDto {
    @IsString()
    @MaxLength(40)
    title: string;

    @IsString()
    @MaxLength(400)
    description: string;

    @IsString()
    @MaxLength(400)
    favIcon: string;

    @IsString()
    @MaxLength(400)
    icon: string;
}
