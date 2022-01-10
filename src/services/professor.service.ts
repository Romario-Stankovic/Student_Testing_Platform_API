import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Professor } from "src/entities/professor.entity";
import { Repository } from "typeorm";

@Injectable()
export class ProfessorService {
    constructor(
        @InjectRepository(Professor)
        private readonly professor: Repository<Professor>
    ) {}

    getAll(): Promise<Professor[]> {
        return this.professor.find();
    }

    getById(id: number): Promise<Professor> {
        return this.professor.findOne(id);
    }

}