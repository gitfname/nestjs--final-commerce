import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WeblogCategoryService } from './weblog-category.service';
import { CreateWeblogCategoryDto } from './dto/create-weblog-category.dto';
import { UpdateWeblogCategoryDto } from './dto/update-weblog-category.dto';

@Controller('weblog-categories')
export class WeblogCategoryController {
  constructor(private readonly weblogCategoryService: WeblogCategoryService) {}

  @Post()
  create(@Body() createWeblogCategoryDto: CreateWeblogCategoryDto) {
    return this.weblogCategoryService.create(createWeblogCategoryDto);
  }

  @Get()
  findAll() {
    return this.weblogCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weblogCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeblogCategoryDto: UpdateWeblogCategoryDto) {
    return this.weblogCategoryService.update(+id, updateWeblogCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weblogCategoryService.remove(+id);
  }
}
