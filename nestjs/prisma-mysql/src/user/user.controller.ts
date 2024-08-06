import {Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe} from "@nestjs/common"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-put-user.dto"
import { UpdatePatchUserDTO } from "./dto/update-patch.dto"
import { UserService } from "./user.service"

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService){ }

    @Post()
    async create_user(@Body() body: CreateUserDTO){
        // console.log(body)
        return this.userService.create(body)
    }
    
    @Get()
    async get_users_list(){
        return this.userService.read_all_users();
    }

    @Get(':email') 
    async get_user(@Param() params){
        return this.userService.read_user(params)
    }

    @Put(':id')
    async update_user(@Body() body: UpdateUserDTO, @Param('id', ParseIntPipe) id: number){
        return this.userService.update_user(body, id)
    }

    @Patch(':id')
    async update_ignore_user(@Body() body: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number ){
        return body
    }

    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number){
        console.log(id)
        return {id:id}
    }
} 