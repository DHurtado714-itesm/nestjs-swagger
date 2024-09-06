import { Module } from '@nestjs/common';
import { PizzasModule } from './pizzas/pizzas.module';
import { BurgersModule } from './burgers/burgers.module';

@Module({
  imports: [PizzasModule, BurgersModule],
  providers: [],
})
export class AppModule {}
