import { PrimaryGeneratedColumn, Column, Entity } from "typeorm"

@Entity()
export class Slider {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    name: string;

    @Column("json")
    slides: any[];
}