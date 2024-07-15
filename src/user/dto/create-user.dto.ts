import { IsString, IsEmail, IsStrongPassword, Matches, MaxLength, Length } from "class-validator"

export class CreateUserDto {
    @IsString()
    @MaxLength(90)
    @Matches(/^[A-Za-z0-9 _]*$/, {
        message: 'The firstName must contain only alphabets, numbers, spaces, and underscores.',
    })
    firstName: string;

    @IsString()
    @MaxLength(90)
    @Matches(/^[A-Za-z0-9 _]*$/, {
        message: 'The lastName must contain only alphabets, numbers, spaces, and underscores.',
    })
    lastName: string;

    @IsEmail({ host_whitelist: ["gmail.com", "email.com"] })
    @MaxLength(90)
    email: string;

    @IsString()
    @Length(11)
    phone: string;

    @IsString()
    @MaxLength(14)
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minNumbers: 2,
        minSymbols: 1,
        minUppercase: 2
    })
    password: string;
}