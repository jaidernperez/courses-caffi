import {Teacher} from '../teacher';
import {DeleteResult, UpdateResult} from 'typeorm';

export interface TeacherRepository {

    save(teacher: Teacher): Promise<Teacher>;

    update(teacher: Teacher): Promise<UpdateResult>;

    findById(id: number): Promise<Teacher>;

    findTeachers(): Promise<Teacher[]>;

    delete(id: number): Promise<DeleteResult>;

    existsById(id: number): Promise<boolean>;
}