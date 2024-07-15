import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Coupon } from './entities/coupon.entity';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';
import { Product } from 'src/product/entity/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon, Product]),
    UserModule,
    ProductModule
  ],
  controllers: [CouponController],
  providers: [CouponService],
})
export class CouponModule { }
