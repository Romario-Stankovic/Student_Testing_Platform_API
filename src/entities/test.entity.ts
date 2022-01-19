import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Question } from "./question.entity";
import { Professor } from "./professor.entity";
import { Work } from "./work.entity";

@Index("fk_test_professor_id", ["professorId"], {})
@Entity("test")
export class Test {
    @PrimaryGeneratedColumn({ name: "test_id", type: "int" })
    testId: number;

    @Column({ name: "professor_id", type: "int", nullable: true })
    professorId: number | null;

    @Column({ name: "test_name", type: "varchar", length: 100 })
    testName: string;

    @Column({ name: "duration", type: "int", default: () => "'0'" })
    duration: number;

    @Column({ name: "question_count", type: "int", default: () => "'0'" })
    questionCount: number;

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
    @JoinColumn([{ name: "professor_id", referencedColumnName: "professorId" }])
    professor: Professor;

    @OneToMany(() => Work, (work) => work.test)
    works: Work[];
}
