import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export class CreatePizzaDto {
  name: string;
  ingredients: string[];
}

export class GetIngredientDto {
  id: string;
  ingredient: string;
}

@ApiTags('pizzas')
@Controller('pizzas')
export class PizzasController {
  @Get('/')
  findAll() {
    return 'This action returns all pizzas';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} pizza`;
  }

  @Get(':id/:ingredient')
  findIngredient(@Query() query: GetIngredientDto) {
    return `This action returns the ${query.ingredient} of a #${query.id} pizza`;
  }

  @Post('/')
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return `This action adds a new pizza: ${createPizzaDto.name}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePizzaDto: CreatePizzaDto) {
    return `This action updates a #${id} pizza with ${updatePizzaDto.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} pizza`;
  }
}
