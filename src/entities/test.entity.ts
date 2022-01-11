import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { Professor } from "./professor.entity";
import { Work } from "./work.entity";

@Index("fk_test_professor_id", ["professorID"], {})
@Entity("test")
export class Test {
  @PrimaryGeneratedColumn({name: "test_id", type: "int"})
  testID: number;

  @Column({ name: "professor_id", type: "int", nullable: true })
  professorID: number | null;

  @Column({ name: "name", type: "varchar", nullable: true, length: 100 })
  name: string | null;

  @Column({ name: "duration", type: "int", nullable: true })
  duration: number | null;

  @Column({ name: "question_count", type: "int", nullable: true })
  questionCount: number | null;

  @Column({ name: "start_at", type: "datetime", nullable: true })
  startAt: Date | null;

  @Column({ name: "end_at", type: "datetime", nullable: true })
  endAt: Date | null;

  @OneToMany(() => Question, (question) => question.test)
  questions: Question[];

  @ManyToOne(() => Professor, (professor) => professor.tests, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "professor_id", referencedColumnName: "professorID" }])
  professor: Professor;

  @OneToMany(() => Work, (work) => work.test)
  works: Work[];
}
