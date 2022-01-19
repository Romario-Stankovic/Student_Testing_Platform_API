import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Answer } from "./answer.entity";
import { Work } from "./work.entity";

@Index("fk_work_answer_answer_id", ["answerId"], {})
@Index("fk_work_answer_work_id", ["workId"], {})
@Entity("work_answer")
export class WorkAnswer {
    @PrimaryGeneratedColumn({ name: "work_answer_id", type: "int" })
    workAnswerId: number;

    @Column({ name: "work_id", type: "int" })
    workId: number;

    @Column({ name: "answer_id", type: "int" })
    answerId: number;

    @Column({ name: "duration", type: "int", default: () => "'0'" })
    duration: number;

    @Column({ name: "is_checked", type: "tinyint", width: 1, default: () => "'0'" })
    isChecked: boolean;

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
