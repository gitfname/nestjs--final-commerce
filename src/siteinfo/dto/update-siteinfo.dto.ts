import { PartialType } from '@nestjs/swagger';
import { CreateSiteinfoDto } from './create-siteinfo.dto';

export class UpdateSiteinfoDto extends PartialType(CreateSiteinfoDto) {}
