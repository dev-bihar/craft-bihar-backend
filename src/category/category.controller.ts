import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.schema';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@Body() body: Partial<Category>) {
    return this.categoryService.create(body);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: Partial<Category>) {
    return this.categoryService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
