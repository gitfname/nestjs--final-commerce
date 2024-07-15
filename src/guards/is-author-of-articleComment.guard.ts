import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { Request } from "express";
import { ArticleCommentService } from "src/article-comment/article-comment.service";

@Injectable()
export class IsAuthorOfArticleComment implements CanActivate {
    constructor(
        private readonly articleCommentService: ArticleCommentService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest()
        const userId = req["user"]["sub"]
        const articleCommentId = req.params?.id

        const articleComment = await this.articleCommentService.findOne(+articleCommentId)

        if (articleComment.author.id !== userId) {
            return false
        }

        return true
    }
}