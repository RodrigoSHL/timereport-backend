import { IsNotEmpty } from "class-validator";

export class CreateClientDto {
    @IsNotEmpty()
    name: string;

    shortName: string;

    active: boolean;
}
