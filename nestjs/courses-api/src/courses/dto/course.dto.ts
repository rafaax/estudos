import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDTO {

    @ApiProperty({type: 'number', description: 'ID' })
    public id: number;
    
    
    @ApiProperty({type: 'string', description: 'Titulo do curso' })
    public title: string;
    
    
    @ApiProperty({type: 'string', description: 'Descrição do curso' })
    public description: string;
}