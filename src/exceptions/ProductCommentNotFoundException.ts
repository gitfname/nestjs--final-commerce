import { NotFoundException } from "@nestjs/common"

export class ProductCommentNotFoundException extends NotFoundException {
    constructor(message?: string) {
        super(message || "product-comment not found")
    }
}