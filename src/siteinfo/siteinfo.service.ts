import { Injectable } from '@nestjs/common';
import { CreateSiteinfoDto } from './dto/create-siteinfo.dto';
import { UpdateSiteinfoDto } from './dto/update-siteinfo.dto';
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from 'typeorm';
import { Siteinfo } from './entities/siteinfo.entity';

@Injectable()
export class SiteinfoService {
  constructor(
    @InjectRepository(Siteinfo) private readonly siteInfoRepository: Repository<Siteinfo>
  ) { }

  async create(createSiteinfoDto: CreateSiteinfoDto): Promise<Siteinfo> {
    return await this.siteInfoRepository.save({ id: 1, ...createSiteinfoDto })
  }

  async createDefaultSiteInfo(): Promise<Siteinfo> {
    return await this.siteInfoRepository.save({
      id: 1,
      title: "SiteInfo : title",
      description: "siteInfo : description",
      favIcon: "siteInfo : favIcon",
      icon: "siteInfo : icon"
    })
  }

  async getSiteInfo(): Promise<Siteinfo> {
    const siteInfo = await this.siteInfoRepository.findOneBy({ id: 1 })
    if (!Siteinfo) {
      return await this.createDefaultSiteInfo()
    }
    return siteInfo
  }

  async update(updateSiteinfoDto: UpdateSiteinfoDto): Promise<void> {
    await this.siteInfoRepository.update({ id: 1 }, { ...updateSiteinfoDto })
  }
}
