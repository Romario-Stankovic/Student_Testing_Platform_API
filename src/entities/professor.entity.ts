import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Professor {
    @PrimaryGeneratedColumn({name: "professor_id", type: "int", unsigned: true})
    professorID: number;
    @Column({name: "first_name", type: "varchar", length: 50})
    name: string;
    @Column({name: "last_name", type:"varchar", length: 50})
    lastName: string;
    @Column({type: "varchar", length: 50, unique: true})
    username: string;
    @Column({type: "varchar", length: 256})
    password: string;
    @Column({name: "image_path", type: "varchar", length: 256})
    image: string
}