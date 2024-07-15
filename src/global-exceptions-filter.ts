import { ExceptionFilter, Catch, ArgumentsHost, InternalServerErrorException, HttpException } from "@nestjs/common"
import { UserNotFoundException } from "./exceptions/UserNotFoundException";
import { EmailAlreadyTakenException } from "./exceptions/EmailAlreadyTakenException";
import { Response } from "express"
import { PhoneNumberAlreadyTakenException } from "./exceptions/PhoneNumberAlreadyTakenException";
import { PhoneNumberOrEmailAlreadyTakenException } from "./exceptions/PhoneNumberOrEmailAlreadyTakenException";
import { CategoryNotFoundException } from "./exceptions/CategoryNotFoundException";
import { WeblogCategoryNotFoundException } from "./exceptions/WeblogCategoryNotFoundException";
import { ArticleNotFoundException } from "./exceptions/ArticleNotFoundException";
import { SliderNotFoundException } from "./exceptions/SliderNotFoundException";
import { ProductNotFoundException } from "./exceptions/ProductNotFoundException";
import { ProductCommentNotFoundException } from "./exceptions/ProductCommentNotFoundException";
import { CouponNotFoundException } from "./exceptions/CouponNotFoundException";

@Catch(UserNotFoundException, EmailAlreadyTakenException, PhoneNumberAlreadyTakenException,
    PhoneNumberOrEmailAlreadyTakenException, CategoryNotFoundException, WeblogCategoryNotFoundException,
    ArticleNotFoundException, SliderNotFoundException, ProductNotFoundException, ProductCommentNotFoundException,
    CouponNotFoundException)
export class ExpectionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const res: Response = host.switchToHttp().getResponse()
        const status = exception instanceof HttpException ? exception.getStatus() : 500
        const exceptionResponse = exception instanceof HttpException ? exception.getResponse() : new InternalServerErrorException().getResponse()

        return res.status(status).json(exceptionResponse)
    }
}