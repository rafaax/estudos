import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) {}

    async createToken(){
        // return this.jwtService.sign();
    }

    async checkToken(){
        // return this.jwtService.verify();
    }

    async login(email: string, password: string){
        this.prisma.users.findFirst({
            where: {
                email: email, 
                password: password
            }
        })
    }

    async reset(){}

    async forget(){}

    async register(){}
}