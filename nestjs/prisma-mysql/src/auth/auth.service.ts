import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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
        const  find_user = await this.prisma.users_auth.findFirst({
            where: {
                email: email, 
                pass: password
            }
        });

        if(find_user == undefined){
            throw new NotFoundException("Usuário invalido...");
        }

        return find_user;
    }

    async reset(password: string, token: string){

        // validar token para obter o id 

        const id : number = 0;

        await this.prisma.users_auth.update({
            where: {
                id: id
            },
            data: {
                pass: password
            }
        })

        return true;

    }

    async forget(email:string){
        const find_email = await this.prisma.users_auth.findFirst({
            where: {
                email: email
            }
        })

        if(find_email == undefined){
            throw new BadRequestException("Email incorreto!");
        }


        // enviar o email para troca de senha
        
        return true;
    }

    async register(){}
}