import { Product } from "src/product/entity/product.entity";
import { PrimaryGeneratedColumn, Entity, Column, CreateDateColumn, JoinColumn, OneToMany } from "typeorm"

@Entity()
export class Coupon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    code: string;

    @Column("date", { nullable: true })
    expireDate: Date;

    @OneToMany(() => Product, product => product.coupon, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    products: Product[]
}
