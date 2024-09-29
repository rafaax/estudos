import { Controller, Get, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';


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
}
