import { PrimaryColumn, Column, Entity } from "typeorm"

@Entity()
export class Siteinfo {
    @PrimaryColumn()
    id: number = 1;

    @Column()
    title: string;

    @Column("text")
    description: string;

    @Column("text")
    favIcon: string;

    @Column()
    icon: string;
}
