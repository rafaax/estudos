import {Controller, Post, Body, Get, Param} from "@nestjs/common"

@Controller('users')
export class UserController {

    @Post()
    async create_user(@Body() body){
        console.log(body)
        return {body}
    }
    
    @Get()
    async list_users(){
        return []
    }

    @Get(':email') 
    async list_user(@Param() params){
        return {user: {}, params}
    }
} 