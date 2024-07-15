import { NotFoundException } from "@nestjs/common"

export class ArticleNotFoundException extends NotFoundException {
    constructor(message?: string) {
        super(message || "article not found")
    }
}