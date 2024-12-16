import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class CreateServsolicitadoDto {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public idCita: number; 

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    public idServicio: number; 
}
