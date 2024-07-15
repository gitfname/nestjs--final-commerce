
import { ERoles } from "src/rbac/user-roles.enum";
import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn } from "typeorm"

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    firstName: string;

    @Column("text")
    lastName: string

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column("boolean")
    isPhoneVerified: boolean;

    @Column("boolean")
    isEmailVerified: boolean

    @Column("boolean")
    isActive: boolean;

    @CreateDateColumn({ type: "timestamp" })
    date_created: Date;

    @Column({ type: "enum", enum: ERoles })
    role: ERoles;

    @Column("text")
    password: string;
}