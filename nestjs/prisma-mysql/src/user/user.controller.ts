import {Controller, Post, Body} from "@nestjs/common"

@Controller('users')
export class UserController {

    @Post()
    async create_user(@Body() body){
        console.log(body)
        return {body}
    }

} 