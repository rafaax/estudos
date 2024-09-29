import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/course.dto';


@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService){

    }

    @Get()
    @ApiOkResponse({description: 'Lista todos os cursos'})
    async getCourses() {
        const courses = await this.coursesService.getCourses();
        return courses;
    }


    @Get(':courseId')
    @ApiOkResponse({description: 'Lista um curso em especifico'})
    async getCourse(@Param('courseId') courseId :  number) {
        const courses = await this.coursesService.getCourse(Number(courseId));
        return courses;
    }


    @Post()
    @ApiCreatedResponse({description: 'Retorna todos os cursos com o novo curso adicionado'})
    async addCourse(@Body() newCourse: CreateCourseDTO){
        const create = await this.coursesService.createCourse(newCourse);
        return create;
    }

    @Delete()
    @ApiOkResponse({description: 'Retorna todos os cursos ja sem o curso removido'})
    async deleteCourse(@Query() query){
        // console.log(query)
        const courseDelete = await this.coursesService.deleteCourse(Number(query.courseId));
        return courseDelete;
    }


}
