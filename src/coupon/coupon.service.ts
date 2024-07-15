import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coupon } from './entities/coupon.entity';
import { ProductService } from 'src/product/product.service';
import { CouponNotFoundException } from 'src/exceptions/CouponNotFoundException';
import { Product } from 'src/product/entity/product.entity';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private readonly couponRepository: Repository<Coupon>,
    @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    private readonly productService: ProductService
  ) { }

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + createCouponDto.expiresInDays)

    const coupon = new Coupon()
    coupon.code = createCouponDto.code
    coupon.expireDate = expireDate

    await this.couponRepository.save(coupon)

    return coupon
  }

  async addProductToCoupon(productId: number, couponId: number): Promise<void> {
    const product = await this.productService.findOneById(productId)
    const coupon = await this.findOne(couponId)

    if (coupon.products?.length > 0) {
      coupon.products.push(product)
    }
    else {
      coupon.products = [product]
    }

    await this.couponRepository.save(coupon)
  }

  async findAll(): Promise<Coupon[]> {
    return await this.couponRepository.find({
      select: {
        id: true, code: true, expireDate: true, products: { id: true, name: true }
      },
      relations: { products: true }
    })
  }

  async findOne(id: number): Promise<Coupon> {
    const coupon = await this.couponRepository.findOne({
      where: { id },
      select: {
        id: true, code: true, expireDate: true, products: { id: true, name: true }
      },
      relations: { products: true }
    })
    if (!coupon) throw new CouponNotFoundException()
    return coupon
  }

  async update(id: number, updateCouponDto: UpdateCouponDto): Promise<void> {
    if (typeof updateCouponDto.expiresInDays === "number") {
      const expireDate = new Date()
      expireDate.setDate(expireDate.getDate() + updateCouponDto.expiresInDays)
      await this.couponRepository.update({ id }, { code: updateCouponDto.code, expireDate })
      return
    }

    const { code } = updateCouponDto
    await this.couponRepository.update({ id }, { code })
  }

  async deleteProductFromCoupon(productId: number): Promise<void> {
    const product = await this.productService.findOneById(productId)
    product.coupon = null

    await this.productRepository.save(product)
  }

  async remove(id: number): Promise<void> {
    await this.couponRepository.delete(id)
  }
}
