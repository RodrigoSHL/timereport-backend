import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateProjectDto {
    @IsNotEmpty()
    name: string;

    shortName: string;

    hours: number;

    complete: boolean;
    
    @IsNotEmpty()
    @IsUUID()
    clientId: string;

    stagesIds: []
}
