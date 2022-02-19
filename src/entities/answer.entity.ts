import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "./question.entity";
import { WorkAnswer } from "./workAnswer.entity";

@Index("fk_answer_question_id", ["questionId"], {})
@Entity("answer")
export class Answer {
    @PrimaryGeneratedColumn({ name: "answer_id", type: "int" })
    answerId: number;

    @Column({ name: "question_id", type: "int" })
    questionId: number;

    @Column({ name: "answer_text", type: "text" })
    answerText: string;

    @Column({ name: "image_path", type: "varchar", nullable: true, length: 256 })
    imagePath: string | null;

    @Column({ name: "is_correct", type: "tinyint", width: 1, default: () => "'0'" })
    isCorrect: boolean;

    @ManyToOne(() => Question, (question) => question.answers, {
        onDelete: "CASCADE",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "question_id", referencedColumnName: "questionId" }])
    question: Question;

    @OneToMany(() => WorkAnswer, (workAnswer) => workAnswer.answer)
    workAnswers: WorkAnswer[];
}
