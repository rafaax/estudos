import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthService } from "src/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly authService: AuthService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const token = context.switchToHttp().getRequest().headers.authorization;

        if(token == undefined){
            throw new UnauthorizedException('Missing token');
        }
        
        var jwtToken = token.split(' ')[1]
        console.log(jwtToken)
        
        this.authService.checkToken(jwtToken)

        // console.log(check)

        return true;
    }
}