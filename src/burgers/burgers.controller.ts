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

export class CreateBurgerDto {
  name: string;
  ingredients: string[];
}

export class GetIngredientDto {
  id: string;
  ingredient: string;
}

@ApiTags('burgers')
@Controller('burgers')
export class BurgersController {
  @Get('/')
  findAll() {
    return 'This action returns all burgers';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} burger`;
  }

  @Get(':id/:ingredient')
  findIngredient(@Query() query: GetIngredientDto) {
    return `This action returns the ${query.ingredient} of a #${query.id} burger`;
  }

  @Post('/')
  create(@Body() createBurgerDto: CreateBurgerDto) {
    return `This action adds a new burger: ${createBurgerDto.name}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateBurgerDto: CreateBurgerDto) {
    return `This action updates a #${id} burger with ${updateBurgerDto.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} burger`;
  }
}
