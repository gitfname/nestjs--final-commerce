import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { UserEntity as User } from "./user.entity"
import { CreateUserDto } from "./dto/create-user.dto"
import { ERoles } from "src/rbac/user-roles.enum"
import { hash } from "bcrypt"
import { UpdateUserDto } from "./dto/update-user.dto"
import { UserNotFoundException } from "src/exceptions/UserNotFoundException"
import { EmailAlreadyTakenException } from "src/exceptions/EmailAlreadyTakenException"
import { PhoneNumberAlreadyTakenException } from "src/exceptions/PhoneNumberAlreadyTakenException"
import { PhoneNumberOrEmailAlreadyTakenException } from "src/exceptions/PhoneNumberOrEmailAlreadyTakenException"

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const isUserAlreadyExist = await this.userRepository.find({
            where: [
                { phone: createUserDto.phone },
                { email: createUserDto.email }
            ]

        })

        if (isUserAlreadyExist?.length > 0) {
            throw new PhoneNumberOrEmailAlreadyTakenException()
        }

        const user = new User()

        user.firstName = createUserDto.firstName
        user.lastName = createUserDto.lastName
        user.email = createUserDto.email
        user.phone = createUserDto.phone
        user.isActive = true
        user.isPhoneVerified = false
        user.isEmailVerified = false
        user.role = ERoles.User
        user.password = await hash(createUserDto.password, 10)

        await this.userRepository.save(user)

        return user
    }

    async findAllUsers(skip: number = 0, take: number = 30): Promise<User[]> {
        return this.userRepository.find({
            take, skip
        })
    }

    async findOneById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id })
        if (!user) throw new UserNotFoundException()
        return user
    }

    async findOneByEmail(email: string, checkAvailable: boolean = false): Promise<User> {
        const user = await this.userRepository.findOneBy({ email })
        if (checkAvailable) {
            if (!user) throw new UserNotFoundException()
        }
        return user
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOneById(id)

        if (updateUserDto.firstName) user.firstName = updateUserDto.firstName
        if (updateUserDto.lastName) user.lastName = updateUserDto.lastName
        if (updateUserDto.email) {
            user.email = updateUserDto.email
            user.isEmailVerified = false
        }
        if (updateUserDto.phone) {
            user.phone = updateUserDto.phone
            user.isPhoneVerified = false
        }

        await this.userRepository.save(user)

        return user
    }

    async deleteUserById(id: number): Promise<void> {
        const user = await this.findOneById(id)
        await this.userRepository.delete(user)
    }
}
