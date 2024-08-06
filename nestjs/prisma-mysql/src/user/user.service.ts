import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePatchUserDTO } from "./dto/update-patch.dto";
import { UpdateUserDTO } from "./dto/update-put-user.dto";

@Injectable()
export class UserService {

    constructor(private readonly prisma: PrismaService) {}
    
    async create({name,  email, dob, cep}: CreateUserDTO) {
            return await this.prisma.users.create({
                data: {
                    email: email,
                    name: name,
                    birthdate: new Date(dob), // passando um campo de Date valido para o SQL
                    cep: cep
                }
            })
    }

    async read_all_users() {
        return await this.prisma.users.findMany();
    }

    async read_user({email}: CreateUserDTO){
        return await this.prisma.users.findFirst({
            where: {email: email}
        })
    }

    async update_user({name,  email, dob, cep} : UpdateUserDTO, id: number) {
        // console.log({name})
        // console.log(id)
        return await this.prisma.users.update({
            data: {
                name: name,
                email: email,
                birthdate: new Date(dob),
                cep: cep
            }, 
            where: {
                id: id
            }
        })
    }
    
    async patch_user(params : UpdatePatchUserDTO, id: number) {
        console.log({params})
        return await this.prisma.users.update({
            data: params, 
            where: {
                id: id
            }
        })
    }
}