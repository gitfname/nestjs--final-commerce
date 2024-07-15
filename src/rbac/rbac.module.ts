import { Module } from "@nestjs/common"
import { UserModule } from "src/user/user.module";
import { UserService } from "src/user/user.service";
@Module({
    imports: [UserModule],
    controllers: [],
    providers: [],
    exports: [UserModule]
})
export class RoleBasedAccessControleModule { }