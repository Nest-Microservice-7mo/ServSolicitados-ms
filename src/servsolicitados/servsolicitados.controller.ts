import { Controller, ParseIntPipe } from '@nestjs/common';
import { ServsolicitadosService } from './servsolicitados.service';
import { CreateServsolicitadoDto } from './dto/create-servsolicitado.dto';
import { UpdateServsolicitadoDto } from './dto/update-servsolicitado.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('servsolicitados')
export class ServsolicitadosController {
  constructor(private readonly servsolicitadosService: ServsolicitadosService) {}

  //@Post()
  @MessagePattern({cmd: 'create_servsolicitado'})
  create(@Payload() createServsolicitadoDto: CreateServsolicitadoDto) {
    return this.servsolicitadosService.create(createServsolicitadoDto);
  }

  //@Get()
  @MessagePattern({cmd: 'find_all_servsolicitados'})
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.servsolicitadosService.findAll(paginationDto);
  }

  //@Get(':id')
  @MessagePattern({cmd: 'find_one_servsolicitado'})
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.servsolicitadosService.findOne(id);
  }

  //@Patch(':id')
  @MessagePattern({cmd: 'update_servsolicitado'})
  update(@Payload() updateServsolicitadoDto: UpdateServsolicitadoDto) {
    return this.servsolicitadosService.update(updateServsolicitadoDto.id, updateServsolicitadoDto);
  }

  //@Delete(':id')
  @MessagePattern({cmd: 'delete_servsolicitado'})
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.servsolicitadosService.remove(id);
  }
}
