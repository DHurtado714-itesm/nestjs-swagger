import { Module } from '@nestjs/common';
import { BurgersController } from './burgers.controller';

@Module({
  controllers: [BurgersController],
})
export class BurgersModule {}
