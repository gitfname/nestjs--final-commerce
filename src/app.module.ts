import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoryEntity } from './category/category.entity';
import { CategoryModule } from './category/category.module';
import { UserEntity } from './user/user.entity';
import { UserModule } from './user/user.module';
import { WeblogCategoryModule } from './weblog-category/weblog-category.module';
import { WeblogCategoryEntity } from './weblog-category/entities/weblog-category.entity';
import { ArticleModule } from './article/article.module';
import { Article } from './article/entities/article.entity';
import { SiteinfoModule } from './siteinfo/siteinfo.module';
import { Siteinfo } from './siteinfo/entities/siteinfo.entity';
import { Slider } from './slider/entity/slider.entity';
import { SliderModule } from './slider/slider.module';
import { ProductModule } from './product/product.module';
import { Product } from './product/entity/product.entity';
import { ProductCommentModule } from './product-comment/product-comment.module';
import { ProductComment } from './product-comment/entities/product-comment.entity';
import { CouponModule } from './coupon/coupon.module';
import { Coupon } from './coupon/entities/coupon.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "",
      password: "",
      port: 32753,
      username: "root",
      database: "postgres",
      entities: [UserEntity, CategoryEntity, WeblogCategoryEntity, Article, Siteinfo, Slider, Product, ProductComment, Coupon],
      synchronize: true
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    WeblogCategoryModule,
    ArticleModule,
    SiteinfoModule,
    SliderModule,
    ProductModule,
    ProductCommentModule,
    CouponModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
