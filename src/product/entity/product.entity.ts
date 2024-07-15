import { CategoryEntity } from "src/category/category.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, ManyToMany, ManyToOne } from "typeorm"

function subtractPercentage(value: number, percentage: number): number {
    const percentageValue = value * (percentage / 100);
    const result = value - percentageValue;
    return result <= 0 ? 0 : result;
}

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("text", { nullable: true })
    description: string;

    @Column("text", { nullable: true })
    technicalReview?: string;

    @Column("text", { nullable: true })
    thumbnailImage: string;

    @Column("json")
    images: unknown[];

    @Column("int4")
    price: number;

    @Column("int2")
    discount: number;

    @Column("int4")
    totalPrice: number;

    @Column("int2")
    inStock: number;

    @Column("int2")
    orderPoint: number;

    @ManyToOne(() => CategoryEntity, { nullable: true, onDelete: "SET NULL" })
    @JoinColumn()
    category: CategoryEntity;

    @Column("boolean", { default: true })
    isPublic: boolean;

    @Column("boolean", { default: false })
    isInSale: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    calculateTotalPrice(): void {
        this.totalPrice = subtractPercentage(this.price, this.discount)
    }
}