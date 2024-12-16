import { PartialType } from '@nestjs/mapped-types';
import { CreateServsolicitadoDto } from './create-servsolicitado.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateServsolicitadoDto extends PartialType(CreateServsolicitadoDto) 
{
    @IsNumber()
    @IsPositive()
    id: number; 
}
