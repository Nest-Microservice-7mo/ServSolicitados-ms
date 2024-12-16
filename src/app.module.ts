import { Module } from '@nestjs/common';
import { ServsolicitadosModule } from './servsolicitados/servsolicitados.module';

@Module({
  imports: [ServsolicitadosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
