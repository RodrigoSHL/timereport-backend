import { Client } from "../../clients/entities/client.entity";
import { Stage } from "../../stages/entities/stage.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    shortName: string;

    @Column()
    hours: number;

    @Column({default:false})
    complete: boolean;

    @ManyToOne(() => Client, (client) => client.projects, {
        nullable: false
    })
    @JoinColumn({name: 'clientId'})
    client: Client

    @ManyToMany(() => Stage, (stage) => stage.projects)
    stages: Stage[]
}
