import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn({name: "student_id", type: "int", unsigned: true})
    studenID: number;
    @Column({name: "first_name", type: "varchar", length: 50})
    name: string;
    @Column({name: "last_name", type:"varchar", length: 50})
    lastName: string;
    @Column({name: "index_number", type:"varchar", length: 10, unique: true})
    index: string;
    @Column({name: "image_path", type:"varchar", length: 256})
    image: string;
}