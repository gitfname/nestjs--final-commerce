import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { SiteinfoService } from './siteinfo.service';
import { CreateSiteinfoDto } from './dto/create-siteinfo.dto';
import { UpdateSiteinfoDto } from './dto/update-siteinfo.dto';
import { Siteinfo } from './entities/siteinfo.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/rbac/roles.decoator';
import { ERoles } from 'src/rbac/user-roles.enum';

@Controller('siteinfo')
export class SiteinfoController {
  constructor(private readonly siteinfoService: SiteinfoService) { }

  @Post()
  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() createSiteinfoDto: CreateSiteinfoDto): Promise<Siteinfo> {
    return await this.siteinfoService.create(createSiteinfoDto);
  }

  @Get()
  async findAll(): Promise<Siteinfo> {
    return await this.siteinfoService.getSiteInfo();
  }

  @Patch()
  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async update(@Param('id') id: string, @Body() updateSiteinfoDto: UpdateSiteinfoDto): Promise<void> {
    await this.siteinfoService.update(updateSiteinfoDto);
  }
}
