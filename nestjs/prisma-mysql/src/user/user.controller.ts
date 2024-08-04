import {Controller, Post, Body, Get, Param, Put, Patch, Delete} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create-user.dto"

@Controller('users')
export class UserController {

    @Post()
    async create_user(@Body() body: CreateUserDTO){
        return {body}
    }
    
    @Get()
    async get_users_list(){
        return []
    }

    @Get(':email') 
    async get_user(@Param() params){
        return {user: {}, params}
    }

    @Put(':email')
    async update_user(@Body() body, @Param() params){
        return {

        }
    }

    @Patch(':email')
    async update_ignore_user(@Body() body, @Param() params ){
        return {
            
        }
    }

    @Delete(':email')
    async delete(@Param() params){
        console.log(params)
        var email:string  = params.email
        return email
    }
} 