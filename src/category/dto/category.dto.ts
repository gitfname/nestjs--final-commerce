import { Exclude, Expose, Type } from "class-transformer"
import { ApiProperty } from "@nestjs/swagger"


class Category_InnerCHildDto {
    @ApiProperty({ example: 1, description: "id of the category" })
    @Expose()
    id: number;

    @ApiProperty({ example: "Fruits", description: "name of the category" })
    @Expose()
    title: string;

    @ApiProperty({ example: "nice fruits in the world", description: "description of the category" })
    @Expose()
    description: string;

    @Exclude()
    parent: any;

    @Exclude()
    children: any;
}

class Category_ChildDto {
    @ApiProperty({ example: 1, description: "id of the category" })
    @Expose()
    id: number;

    @ApiProperty({ example: "Fruits", description: "name of the category" })
    @Expose()
    title: string;

    @ApiProperty({ example: "nice fruits in the world", description: "description of the category" })
    @Expose()
    description: string;

    @Exclude()
    parent: any;

    @ApiProperty({ type: Category_InnerCHildDto, description: "child of the category", isArray: true })
    @Expose()
    @Type(() => Category_InnerCHildDto)
    children: Category_InnerCHildDto[];
}

export class Category_ParentDto {
    @ApiProperty({ example: 1, description: "id of the category" })
    @Expose()
    id: number;

    @ApiProperty({ example: "Fruits", description: "name of the category" })
    @Expose()
    title: string;

    @ApiProperty({ example: "nice fruits in the world", description: "description of the category" })
    @Expose()
    description: string;

    @Exclude()
    parent: any;

    @ApiProperty({ type: Category_ChildDto, description: "child of the category", isArray: true })
    @Expose()
    @Type(() => Category_ChildDto)
    children: Category_ChildDto[];
}

export class CategoryDto {
    @ApiProperty({ example: 1, description: "id of the category" })
    @Expose()
    id: number;

    @ApiProperty({ example: "Fruits", description: "name of the category" })
    @Expose()
    title: string;

    @ApiProperty({ example: "nice fruits in the world", description: "description of the category" })
    @Expose()
    description: string;

    @ApiProperty({ description: "parent of the category", type: Category_ParentDto, nullable: true })
    @Expose()
    @Type(() => Category_ParentDto)
    parent: null | Category_ParentDto;

    @ApiProperty({ type: Category_ChildDto, description: "child of the category", isArray: true })
    @Expose()
    @Type(() => Category_ChildDto)
    children: Category_ChildDto[];
}