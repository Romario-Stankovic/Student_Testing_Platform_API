import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("uq_administrator_username", ["username"], { unique: true })
@Entity("administrator")
export class Administrator {
    @PrimaryGeneratedColumn({ type: "int", name: "administrator_id" })
    administratorId: number;

    @Column({ name: "first_name", type: "varchar", length: 50 })
    firstName: string;

    @Column({ name: "last_name", type: "varchar", length: 50 })
    lastName: string;

    @Column({ name: "username", type: "varchar", unique: true, length: 50 })
    username: string;

    @Column({ name: "password_hash", type: "varchar", length: 256 })
    passwordHash: string;
}