import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn,}from "typeorm";
import { Question } from "./question.entity";
import { WorkAnswer } from "./workAnswer.entity";

@Index("fk_answer_question_id", ["questionId"], {})
@Entity("answer")
export class Answer {
  @PrimaryGeneratedColumn({name: "answer_id",type: "int"})
  answerID: number;

  @Column({ name: "question_id", type: "int", nullable: true })
  questionID: number | null;

  @Column({ name: "text", type: "text", nullable: true })
  text: string | null;

  @Column({ name: "image_path", type: "varchar", nullable: true, length: 256 })
  imagePath: string | null;

  @Column({ name: "is_correct", type: "tinyint", nullable: true, width: 1 })
  isCorrect: boolean | null;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  
  @JoinColumn([{ name: "question_id", referencedColumnName: "questionId" }])
  question: Question;

  @OneToMany(() => WorkAnswer, (workAnswer) => workAnswer.answer)
  workAnswers: WorkAnswer[];
}
