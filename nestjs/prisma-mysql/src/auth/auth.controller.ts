import { BadRequestException, Body, Controller, Get, Headers, Param, Post, Request, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { UserAuth } from "src/decorators/user.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";


@Roles(Role.Admin, Role.User)
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}
    

    @Post('login')
    async login(@Body() body:AuthLoginDTO){
        return this.authService.login(body.login, body.password);
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO){
        return this.authService.register(body.email, body.login, body.password);
    }

    @Post('forget') 
    async forget_password(@Body() body: AuthForgetDTO ){
        return this.authService.forget(body.email);
    }

    @Post('reset')
    async reset_password(@Body() body: AuthResetDTO){
        return this.authService.reset(body.password, body.token)
    }

    @UseGuards(AuthGuard)
    @Get()
    async valida_token(@UserAuth() userauth_data : any, @Request() request : any){
        
        return {token_data: request.token_data, user_data: userauth_data};
    }
}