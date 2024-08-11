import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [JwtModule.register({
        secret: `G^S05j0HMq&3z,+'N"D~pR+3]2EKHMxb`
    })]
})

export class AuthModule {
    
}