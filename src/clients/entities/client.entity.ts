import { Project } from "../../projects/entities/project.entity";

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    shortName: string;

    @Column({default:true})
    active: boolean;

    @OneToMany(() => Project, (project) => project.client )
    projects: Project[]
}
