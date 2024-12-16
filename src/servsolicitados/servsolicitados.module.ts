import { Module } from '@nestjs/common';
import { ServsolicitadosService } from './servsolicitados.service';
import { ServsolicitadosController } from './servsolicitados.controller';

@Module({
  controllers: [ServsolicitadosController],
  providers: [ServsolicitadosService],
})
export class ServsolicitadosModule {}
