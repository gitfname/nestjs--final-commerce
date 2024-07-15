import { NotFoundException } from "@nestjs/common"

export class WeblogCategoryNotFoundException extends NotFoundException {
    constructor(message?: string) {
        super(message || "category not found")
    }
}