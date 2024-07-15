import { NotFoundException } from "@nestjs/common"

export class ArticleCommentNotFoundException extends NotFoundException {
    constructor(message?: string) {
        super(message || "article-comment not found")
    }
}