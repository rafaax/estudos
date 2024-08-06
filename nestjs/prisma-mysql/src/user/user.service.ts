import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePatchUserDTO } from "./dto/update-patch.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}
    
    async create({name,  email, dob, cep, cnpj}: CreateUserDTO) {
            return await this.prisma.users.create({
                data: {
                    email: email,
                    name: name,
                    birthdate: new Date(dob), // passando um campo de Date valido para o SQL
                    cep: cep, 
                    cnpj: cnpj ? cnpj : null
                }
            });
    }

    async read_all_users() {
        return await this.prisma.users.findMany();
    }

    async read_user({email}: CreateUserDTO){
        return await this.prisma.users.findFirst({
            where: {email: email}
        })
    }

    async update_user({name,  email, dob, cep, cnpj} : CreateUserDTO, id: number) {
        return await this.prisma.users.update({
            data: {
                name: name,
                email: email,
                birthdate: new Date(dob),
                cep: cep, 
                cnpj: cnpj ? cnpj : null
            }, 
            where: {
                id: id
            }
        })
    }
    
    async patch_user(params : UpdatePatchUserDTO, id: number) {
        return await this.prisma.users.update({
            data: params, 
            where: {
                id: id
            }
        })
    }

    async delete_user(id: number){
        
        const user : any = await this.prisma.users.findFirst({
            where: {
                id: id
            }
        })

        if(user !== null){
            return await this.prisma.users.delete({
                where: {
                    id: id
                }
            })
        }else{
            return {erro: 'usuário não existe'}
        }
        

        
    }
}