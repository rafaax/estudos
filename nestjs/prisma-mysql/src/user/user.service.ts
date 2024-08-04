import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";

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
}