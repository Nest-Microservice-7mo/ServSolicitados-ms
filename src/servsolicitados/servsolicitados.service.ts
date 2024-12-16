import { HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateServsolicitadoDto } from './dto/create-servsolicitado.dto';
import { UpdateServsolicitadoDto } from './dto/update-servsolicitado.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ServsolicitadosService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Servicios Solicitados Service')

  onModuleInit() {
    this.$connect();
    this.logger.log('Base de Datos Conectada');
  }

  create(createServsolicitadoDto: CreateServsolicitadoDto) {
    return this.servSolicitados.create({
      data: createServsolicitadoDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalPages = await this.servSolicitados.count();
    const lastPage = Math.ceil(totalPages / limit);

    if(page > lastPage) {
      return {
        message: `La página ${page} no existe`,
        meta: {
          total: totalPages,
          page: page,
          lastPage: lastPage
        }
      }
    }

    return {
      data: await this.servSolicitados.findMany({
        skip: ( page - 1 ) * limit,
        take: limit
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
    const servsolicitado = await this.servSolicitados.findFirst({where: {id}})
    if (!servsolicitado) {
      throw new RpcException({
        message: 'Servicios Solicitados no encontrados',
        status: HttpStatus.BAD_REQUEST
      });
    }
    return servsolicitado;
  }

  async update(id: number, updateServsolicitadoDto: UpdateServsolicitadoDto) {
    await this.findOne(id);
    const { id:__, ...data } = updateServsolicitadoDto;
    const servsolicitado = await this.servSolicitados.update({
      where: {id},
      data: data
    });
    return servsolicitado;
  }

  async remove(id: number) {
    await this.findOne(id);
    const servsolicitado = await this.servSolicitados.update({
      where: {id},
      data: {}
    });
    return servsolicitado;
  }
}
