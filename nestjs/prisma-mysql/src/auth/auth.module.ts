import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        
        JwtModule.register({
            secret: `G^S05j0HMq&3z,+'N"D~pR+3]2EKHMxb`
        }),
        
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {

}