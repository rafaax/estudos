import { IsEmail, IsString } from "class-validator";

export class AuthResetDTO {
    
    @IsEmail()
    email:string
    

    @IsString()
    login: string

}