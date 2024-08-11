import { IsEmail, IsStrongPassword } from "class-validator"

export class AuthLoginDTO {
    
    @IsEmail()
    emaill:string

    @IsStrongPassword()
    password:string
}