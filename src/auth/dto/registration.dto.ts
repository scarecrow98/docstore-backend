import { IsEmail, IsString, MinLength } from "class-validator";

export class RegistrationDto {
    @IsString()
    @MinLength(1)
    firstName: string;

    @IsString()
    @MinLength(1)
	lastName: string;

    @IsEmail()
	email: string;

    @IsString()
    @MinLength(8)
	password: string;

    @IsString()
    @MinLength(8)
	passwordAgain: string;
}