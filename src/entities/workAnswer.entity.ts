import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Answer } from "./answer.entity";
import { Work } from "./work.entity";

@Index("fk_work_answer_answer_id", ["answerId"], {})
@Index("fk_work_answer_work_id", ["workId"], {})
@Entity("work_answer")
export class WorkAnswer {
  @PrimaryGeneratedColumn({name: "work_answer_id", type: "int"})
  workAnswerId: number;

  @Column({ name: "work_id", type: "int", nullable: true })
  workId: number | null;

  @Column({ name: "answer_id", type: "int", nullable: true })
  answerId: number | null;

  @Column({ name: "duration", type: "int", nullable: true })
  duration: number | null;

  @Column({ name: "is_checked", type: "tinyint", nullable: true, width: 1 })
  isChecked: boolean | null;

  @ManyToOne(() => Answer, (answer) => answer.workAnswers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "answer_id", referencedColumnName: "answerId" }])
  answer: Answer;

  @ManyToOne(() => Work, (work) => work.workAnswers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "work_id", referencedColumnName: "workId" }])
  work: Work;
}
