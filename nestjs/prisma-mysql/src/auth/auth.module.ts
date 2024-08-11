import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [
        
        JwtModule.register({
            secret: `G^S05j0HMq&3z,+'N"D~pR+3]2EKHMxb`
        }),
        PrismaModule
    ],
    controllers: [AuthController]
})

export class AuthModule {

}