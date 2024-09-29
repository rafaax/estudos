import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { COURSES } from './mocks/courses.mock';
import { CreateCourseDTO } from './dto/course.dto';

@Injectable()
export class CoursesService {

    courses = COURSES

    getCourses() : Promise<any> {
        return new Promise(resolve => {
            resolve(this.courses)
        })
    }

    getCourse(courseId : number) : Promise<any> {
        return new Promise(resolve => {
            const course = this.courses.find(course => course.id == courseId);
            
            if(!course){
                throw new HttpException('O curso com esse id não existe', 400)
            }

            resolve(course)
        })
    }

    createCourse(course: CreateCourseDTO) : Promise<any> {
        
        if(course.description == null  || course.title == null){
            throw new BadRequestException("Você não pode fazer um post vazio!")
        }

        if(course.id == null){
            let last_array_id = this.courses[this.courses.length -1].id; 
            course.id = last_array_id + 1;
        }
        
        return new Promise(resolve => {
            this.courses.push(course);
            resolve(this.courses)
        })
    }

    deleteCourse(courseId) : Promise<any> {
        return new Promise(resolve => {
            let index = this.courses.findIndex(course => course.id === courseId);

            if(index === -1){
                throw new BadRequestException("O curso com esse ID não existe")
            }

            this.courses.splice(index, 1);

            resolve(this.courses)
        })
    }

}
