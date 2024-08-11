import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDTO } from "./auth-login.dto";

@Controller('auth')
export class AuthController {
    

    @Post('login')
    async login(@Body() body:AuthLoginDTO){

    }

    @Post('register')
    async register(@Body() body){

    }
}