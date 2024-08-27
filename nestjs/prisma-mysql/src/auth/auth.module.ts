import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [
        
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        
        PrismaModule
    ],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule {

}