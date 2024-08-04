import { IsDate, IsDateString, IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDTO {
    
    @IsString()
    name: string;
    
    @IsEmail()    
    email: string;

    @IsDateString()
    dob: string;

    @IsString()
    cep: string;
}