import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from "@nestjs/common"
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { plainToClass } from "class-transformer"
import { UserGetRequestParams } from "./dto/user-get-request.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserPutRequestParams } from "./dto/user-put-request-params";
import { UserDeleteRequestParams } from "./dto/user-delete-params.dto";
import { AuthGuard } from "src/guards/auth.guard";
import { RoleGuard } from "src/guards/role.guard";
import { Roles } from "src/rbac/roles.decoator";
import { ERoles } from "src/rbac/user-roles.enum";

@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard)
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
        return plainToClass(UserDto, await this.userService.createUser(createUserDto), { excludeExtraneousValues: true })
    }

    @Get()
    @Roles(ERoles.Admin, ERoles.Owner)
    @UseGuards(AuthGuard, RoleGuard)
    async findAllUser(@Req() req: Request): Promise<UserDto[]> {
        console.log(req["user"])
        return plainToClass(UserDto, await this.userService.findAllUsers(), { excludeExtraneousValues: true })
    }

    @Get("profile")
    @UseGuards(AuthGuard)
    async profile(@Req() req: Request): Promise<UserDto> {
        return plainToClass(UserDto, await this.userService.findOneById(req["user"]["sub"]))
    }

    @Get(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async findOneUserById(@Param() params: UserGetRequestParams): Promise<UserDto> {
        return plainToClass(UserDto, await this.userService.findOneById(+params.id), { excludeExtraneousValues: true })
    }

    @Put(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async updateUserById(@Body() updateUserdto: UpdateUserDto, @Param() params: UserPutRequestParams): Promise<UserDto> {
        return plainToClass(UserDto, await this.userService.updateUser(+params.id, updateUserdto))
    }

    @Delete(":id")
    @Roles(ERoles.Owner, ERoles.Admin)
    @UseGuards(AuthGuard, RoleGuard)
    async deleteUserById(@Param() params: UserDeleteRequestParams): Promise<void> {
        await this.userService.deleteUserById(+params.id)
    }
}