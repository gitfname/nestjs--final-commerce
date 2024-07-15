
import { Article } from "src/article/entities/article.entity";
import { UserEntity } from "src/user/user.entity";
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class ArticleComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title: string;

    @Column("text")
    content: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    author: UserEntity

    @ManyToOne(() => Article)
    @JoinColumn()
    article: Article;
}
