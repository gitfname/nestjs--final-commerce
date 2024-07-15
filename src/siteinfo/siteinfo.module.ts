import { Module } from '@nestjs/common';
import { SiteinfoService } from './siteinfo.service';
import { SiteinfoController } from './siteinfo.controller';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Siteinfo } from './entities/siteinfo.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Siteinfo]),
    UserModule
  ],
  controllers: [SiteinfoController],
  providers: [SiteinfoService],
})
export class SiteinfoModule { }
