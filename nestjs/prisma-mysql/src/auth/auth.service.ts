import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { users_auth } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService
    ) {}

    async createToken(user: users_auth){
        return this.jwtService.sign({
            sub: user.id,
            name: user.login,
            email: user.email
        },
        {
            expiresIn: '1 day',
            issuer: 'Login',
            audience: 'users-auth'
        });
    }

    async checkToken(token: string){
        console.log(token)
        try {
            const verify = this.jwtService.verify(token, {
                audience: 'users-auth', 
                issuer: 'Login'
            });

            return verify;
        }catch(e){
            throw new ForbiddenException(
                {
                    msg: 'Token inválido',
                    error: e
                }
            )
        }
        
    }

    async login(login: string, password: string){
        const  find_user = await this.prisma.users_auth.findFirst({
            where: {
                login: login, 
                pass: password
            }
        });

        if(find_user == undefined){
            throw new NotFoundException("Usuário invalido...");
        }

        return {
            "access_token": await this.createToken(find_user)
        }
            
    }

    async reset(password: string, token: string){

        // validar token para obter o id 

        const id : number = 0;

        const user = await this.prisma.users_auth.update({
            where: {
                id: id
            },
            data: {
                pass: password
            }
        })

        return this.createToken(user);

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

    async register(email: string, login: string, password: string){
        const user =  await this.prisma.users_auth.create({
            data: {
                email: email,
                pass: password, 
                login: login
            }
        });

        return this.createToken(user)
    }
}