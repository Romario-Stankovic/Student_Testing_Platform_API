import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Answer } from "./answer.entity";
import { Work } from "./work.entity";

@Index("fk_work_answer_answer_id", ["answerID"], {})
@Index("fk_work_answer_work_id", ["workID"], {})
@Entity("work_answer")
export class WorkAnswer {
  @PrimaryGeneratedColumn({name: "work_answer_id", type: "int"})
  workAnswerID: number;

  @Column({ name: "work_id", type: "int", nullable: true })
  workID: number | null;

  @Column({ name: "answer_id", type: "int", nullable: true })
  answerID: number | null;

  @Column({ name: "duration", type: "int", nullable: true })
  duration: number | null;

  @Column({ name: "is_checked", type: "tinyint", nullable: true, width: 1 })
  isChecked: boolean | null;

  @ManyToOne(() => Answer, (answer) => answer.workAnswers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "answer_id", referencedColumnName: "answerID" }])
  answer: Answer;

  @ManyToOne(() => Work, (work) => work.workAnswers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "work_id", referencedColumnName: "workID" }])
  work: Work;
}
