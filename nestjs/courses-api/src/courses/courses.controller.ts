import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/course.dto';


@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService){

    }

    @Get()
    async getCourses() {
        const courses = await this.coursesService.getCourses();
        return courses;
    }


    @Get(':courseId')
    async getCourse(@Param('courseId') courseId :  number) {
        const courses = await this.coursesService.getCourse(Number(courseId));
        return courses;
    }


    @Post()
    async addCourse(@Body() newCourse: CreateCourseDTO){
        const create = await this.coursesService.createCourse(newCourse);
        return create;
    }

    @Delete()
    async deleteCourse(@Query() query){
        // console.log(query)
        const courseDelete = await this.coursesService.deleteCourse(Number(query.courseId));
        return courseDelete;
    }


}
