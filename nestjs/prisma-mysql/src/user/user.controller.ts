import {Controller, Post, Body, Get, Param, Put, Patch} from "@nestjs/common"

@Controller('users')
export class UserController {

    @Post()
    async create_user(@Body() body){
        console.log(body)
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
} 