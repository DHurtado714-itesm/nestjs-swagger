import { Module } from '@nestjs/common';
import { PizzasController } from './pizzas.controller';

@Module({
  controllers: [PizzasController],
})
export class PizzasModule {}
