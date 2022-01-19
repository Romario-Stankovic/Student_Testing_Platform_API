import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Test } from "./test.entity";

@Index("uq_professor_username", ["username"], { unique: true })
@Entity("professor")
export class Professor {
    @PrimaryGeneratedColumn({ name: "professor_id", type: "int" })
    professorId: number;

    @Column({ name: "first_name", type: "varchar", length: 50 })
    firstName: string;

    @Column({ name: "last_name", type: "varchar", length: 50 })
    lastName: string;

    @Column({ name: "username", type: "varchar", unique: true, length: 50 })
    username: string;

    @Column({ name: "password_hash", type: "varchar", length: 256 })
    passwordHash: string;

    @Column({ name: "image_path", type: "varchar", nullable: true, length: 256 })
    imagePath: string | null;

    @OneToMany(() => Test, (test) => test.professor)
    tests: Test[];
}
