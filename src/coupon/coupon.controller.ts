import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { AddProductToCouponReqParamsDto } from 'src/coupon/dto/add-product-to-coupon-req-params.dto';
import { DeleteProductFromCouponReqParamsDto } from './dto/delete-product-from-coupon-req-params.dto';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.couponService.create(createCouponDto)
  }

  @Post("add-product/:couponId/:productId")
  async addProductToCoupon(@Param() params: AddProductToCouponReqParamsDto): Promise<void> {
    await this.couponService.addProductToCoupon(+params.productId, +params.couponId)
  }

  @Get("test")
  test() {
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 20)

    return {
      today,
      tomorrow
    }
  }

  @Get()
  async findAll(): Promise<Coupon[]> {
    return await this.couponService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Coupon> {
    return await this.couponService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto): Promise<void> {
    await this.couponService.update(+id, updateCouponDto);
  }

  @Delete("delete-product/:productId")
  async deleteProductFromCoupon(@Param() params: DeleteProductFromCouponReqParamsDto): Promise<void> {
    await this.couponService.deleteProductFromCoupon(+params.productId)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.couponService.remove(+id);
  }
}
