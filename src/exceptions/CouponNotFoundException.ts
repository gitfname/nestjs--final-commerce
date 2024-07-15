import { NotFoundException } from "@nestjs/common";

export class CouponNotFoundException extends NotFoundException {
    constructor(message?: string) {
        super(message || "coupon not found")
    }
}