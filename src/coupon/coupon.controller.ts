import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { Coupon } from './entities/coupon.entity';
import { AddProductToCouponReqParamsDto } from 'src/coupon/dto/add-product-to-coupon-req-params.dto';
import { DeleteProductFromCouponReqParamsDto } from './dto/delete-product-from-coupon-req-params.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/rbac/roles.decoator';
import { ERoles } from 'src/rbac/user-roles.enum';

@Controller('coupons')
export class CouponController {
  constructor(private readonly couponService: CouponService) { }

  @Post()
  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  async create(@Body() createCouponDto: CreateCouponDto): Promise<Coupon> {
    return await this.couponService.create(createCouponDto)
  }

  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Post("add-product/:couponId/:productId")
  async addProductToCoupon(@Param() params: AddProductToCouponReqParamsDto): Promise<void> {
    await this.couponService.addProductToCoupon(+params.productId, +params.couponId)
  }

  @Get()
  async findAll(): Promise<Coupon[]> {
    return await this.couponService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Coupon> {
    return await this.couponService.findOne(+id);
  }

  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto): Promise<void> {
    await this.couponService.update(+id, updateCouponDto);
  }

  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete("delete-product/:productId")
  async deleteProductFromCoupon(@Param() params: DeleteProductFromCouponReqParamsDto): Promise<void> {
    await this.couponService.deleteProductFromCoupon(+params.productId)
  }

  @Roles(ERoles.Owner, ERoles.Admin)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.couponService.remove(+id);
  }
}
