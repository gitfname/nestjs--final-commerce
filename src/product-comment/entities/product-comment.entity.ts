
import { Product } from "src/product/entity/product.entity";
import { UserEntity } from "src/user/user.entity";
import { PrimaryGeneratedColumn, Entity, Column, ManyToOne, JoinColumn } from "typeorm"

@Entity()
export class ProductComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    title: string;

    @Column("text")
    content: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    author: UserEntity

    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;
}
