
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, OneToMany } from "typeorm"

@Entity()
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title: string;

    @Column("text")
    description: string;

    @ManyToOne(
        () => CategoryEntity,
        (category) => category.children,
        { nullable: true, onDelete: "SET NULL" }
    )
    parent: CategoryEntity | null

    @OneToMany(
        () => CategoryEntity,
        (category) => category.parent,
        { nullable: true, onDelete: "CASCADE" }
    )
    children: CategoryEntity[] | [];
}