import { PrimaryGeneratedColumn, Column, Entity } from "typeorm"

@Entity()
export class WeblogCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title: string;

    @Column("text")
    description: string;

    @Column("text")
    image: string;
}
