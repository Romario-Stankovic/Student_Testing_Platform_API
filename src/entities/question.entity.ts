import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Answer } from "./answer.entity";
import { Test } from "./test.entity";

@Index("fk_question_test_id", ["testID"], {})
@Entity("question")
export class Question {
  @PrimaryGeneratedColumn({ name: "question_id", type: "int"})
  questionID: number;

  @Column({name: "test_id", type: "int", nullable: true })
  testID: number | null;

  @Column({name: "text", type:"text", nullable: true })
  text: string | null;

  @Column({name: "image_path", type: "varchar", nullable: true, length: 255 })
  imagePath: string | null;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToOne(() => Test, (test) => test.questions, {
    onDelete: "RESTRICT",
    onUpdate: "RESTRICT",
  })
  @JoinColumn([{ name: "test_id", referencedColumnName: "testID" }])
  test: Test;
}
