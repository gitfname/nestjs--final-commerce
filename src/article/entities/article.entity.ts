import { UserEntity } from "src/user/user.entity";
import { WeblogCategoryEntity } from "src/weblog-category/entities/weblog-category.entity";
import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class Article {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title: string;

    @Column("text")
    description: string;

    @Column("text")
    content: string;

    @Column("text")
    thumbnailImage: string;

    @Column("text")
    coverImage: string;

    @ManyToOne(() => WeblogCategoryEntity, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    category: WeblogCategoryEntity;

    @ManyToOne(() => UserEntity, { nullable: true, onDelete: "CASCADE" })
    @JoinColumn()
    author: UserEntity;
}
