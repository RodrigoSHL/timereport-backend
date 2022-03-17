import { Project } from "../../projects/entities/project.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Stage {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => Project, (project) => project.stages)
    @JoinTable({
        name: 'relationProjectStage',
        joinColumn: {
            name: 'projectId',
        },
        inverseJoinColumn: {
            name: 'stageId'
        }
    })
    projects: Project[]
}
