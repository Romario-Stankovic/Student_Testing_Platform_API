import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Work } from "./work.entity";

@Index("uq_student_index_number", ["indexNumber"], { unique: true })
@Entity("student")
export class Student {
  @PrimaryGeneratedColumn({ name: "student_id", type: "int"})
  studentID: number;

  @Column({name: "first_name", type: "varchar", nullable: true, length: 50 })
  firstName: string | null;

  @Column({name: "last_name", type: "varchar", nullable: true, length: 50 })
  lastName: string | null;

  @Column({name: "index_number", type: "varchar", unique: true, length: 10 })
  indexNumber: string;

  @Column({ name: "image_path", type: "varchar", nullable: true, length: 256 })
  imagePath: string | null;

  @OneToMany(() => Work, (work) => work.student)
  works: Work[];
}
