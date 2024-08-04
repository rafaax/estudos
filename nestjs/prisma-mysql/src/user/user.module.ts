import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaModel } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModel], 
    controllers: [UserController],
    providers: [UserService], 
    exports: [],
}) 
export class UserModule {}