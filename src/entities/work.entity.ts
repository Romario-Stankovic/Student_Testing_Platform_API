import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, } from "typeorm";
import { Student } from "./student.entity";
import { Test } from "./test.entity";
import { WorkAnswer } from "./workAnswer.entity";

@Index("uq_work_student_id_test_id", ["studentId", "testId"], { unique: true })
@Index("fk_work_test_id", ["testId"], {})
@Index("fk_work_student_id", ["studentId"], {})
@Entity("work")
export class Work {
    @PrimaryGeneratedColumn({ type: "int", name: "work_id" })
    workId: number;

    @Column({ name: "student_id", type: "int" })
    studentId: number;

    @Column({ name: "test_id", type: "int" })
    testId: number;

    @Column({ name: "started_at", type: "datetime", nullable: true })
    startedAt: Date | null;

    @Column({ name: "ended_at", type: "datetime", nullable: true })
    endedAt: Date | null;

    @Column({ name: "points", type: "int", default: () => "'0'" })
    points: number;

    @ManyToOne(() => Student, (student) => student.works, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "student_id", referencedColumnName: "studentId" }])
    student: Student;

    @ManyToOne(() => Test, (test) => test.works, {
        onDelete: "RESTRICT",
        onUpdate: "RESTRICT",
    })
    @JoinColumn([{ name: "test_id", referencedColumnName: "testId" }])
    test: Test;

    @OneToMany(() => WorkAnswer, (workAnswer) => workAnswer.work)
    workAnswers: WorkAnswer[];
}
