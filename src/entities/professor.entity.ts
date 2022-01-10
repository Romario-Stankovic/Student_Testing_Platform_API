import {Column,Entity,Index,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import { Test } from "./test.entity";

@Index("uq_professor_username", ["username"], { unique: true })
@Entity("professor")
export class Professor {
  @PrimaryGeneratedColumn({name: "professor_id", type: "int"})
  professorID: number;

  @Column({name: "first_name", type: "varchar", nullable: true, length: 50 })
  firstName: string | null;

  @Column({name: "last_name", type: "varchar", nullable: true, length: 50 })
  lastName: string | null;

  @Column({name: "username", type: "varchar", nullable: true, unique: true, length: 50})
  username: string | null;

  @Column({name: "password", type: "varchar", nullable: true, length: 256 })
  password: string | null;

  @Column({name: "image_path", type: "varchar", nullable: true, length: 256 })
  imagePath: string | null;

  @OneToMany(() => Test, (test) => test.professor)
  tests: Test[];
}
