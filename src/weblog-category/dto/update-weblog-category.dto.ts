import { PartialType } from '@nestjs/swagger';
import { CreateWeblogCategoryDto } from './create-weblog-category.dto';

export class UpdateWeblogCategoryDto extends PartialType(CreateWeblogCategoryDto) {}
