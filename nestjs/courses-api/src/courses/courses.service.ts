import { HttpException, Injectable } from '@nestjs/common';
import { COURSES } from './mocks/courses.mock';

@Injectable()
export class CoursesService {

    courses = COURSES

    getCourses() : Promise<any> {
        return new Promise(resolve => {
            resolve(this.courses)
        })
    }

    getCourse(courseId : number) : Promise<any> {
        console.log(courseId)
        return new Promise(resolve => {
            const course = this.courses.find(course => course.id == courseId);
            
            if(!course){
                throw new HttpException('O curso com esse id não existe', 400)
            }

            console.log(course);
            resolve(course)
        })
    }

}
