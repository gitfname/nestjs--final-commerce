import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm"
import { WeblogCategoryEntity as WeblogCategory } from './entities/weblog-category.entity';
import { Repository } from 'typeorm';
import { CreateWeblogCategoryDto } from './dto/create-weblog-category.dto';
import { UpdateWeblogCategoryDto } from './dto/update-weblog-category.dto';
import { WeblogCategoryNotFoundException } from 'src/exceptions/WeblogCategoryNotFoundException';

@Injectable()
export class WeblogCategoryService {
  constructor(
    @InjectRepository(WeblogCategory) private readonly weblogCategoryRepository: Repository<WeblogCategory>
  ) { }

  async create(createWeblogCategoryDto: CreateWeblogCategoryDto): Promise<WeblogCategory> {
    return await this.weblogCategoryRepository.save(createWeblogCategoryDto)
  }

  async findAll(): Promise<WeblogCategory[]> {
    return await this.weblogCategoryRepository.find()
  }

  async findOne(id: number): Promise<WeblogCategory> {
    const category = await this.weblogCategoryRepository.findOneBy({ id })
    if (!category) throw new WeblogCategoryNotFoundException()
    return category
  }

  async update(id: number, updateWeblogCategoryDto: UpdateWeblogCategoryDto): Promise<void> {
    await this.weblogCategoryRepository.update({ id }, updateWeblogCategoryDto)
  }

  async remove(id: number): Promise<void> {
    await this.weblogCategoryRepository.delete(id)
  }
}
