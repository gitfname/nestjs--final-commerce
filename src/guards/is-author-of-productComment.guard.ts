import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Request } from "express";
import { ProductCommentService } from "src/product-comment/product-comment.service";

@Injectable()
export class IsAuthorOfProductComment implements CanActivate {
    constructor(
        private readonly productCommentService: ProductCommentService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest()
        const userId = req["user"]["sub"]
        const productCommentId = req.params?.id

        const productComment = await this.productCommentService.findOne(+productCommentId)

        if (productComment.author.id !== userId) {
            return false
        }

        return true
    }
}