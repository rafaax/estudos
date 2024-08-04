import {Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-put-user.dto"
import { UpdatePatchUserDTO } from "./dto/update-patch.dto"

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
    async update_user(@Body() body: UpdateUserDTO, @Param() params){
        return body
    }

    @Patch(':email')
    async update_ignore_user(@Body() body: UpdatePatchUserDTO, @Param() params ){
        return body
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        console.log(id)
        return {id:id}
    }
} 