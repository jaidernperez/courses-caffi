import {inject, injectable} from 'inversify';
import {Teacher, TeacherRepository} from '../../../domain/models';
import {DeleteResult, getConnection, Repository, UpdateResult} from 'typeorm';
import {TeacherDataMapper} from '../mappers/teacher/teacher.data.mapper';
import {TeacherData} from './teacher.data';

@injectable()
export class TeacherAdapter implements TeacherRepository {

    constructor(@inject(Symbol.for('TeacherDataMapper')) private mapper: TeacherDataMapper) {
    }

    delete(id: number): Promise<DeleteResult> {
        const teacherDataRepository: Repository<TeacherData> = getConnection().getRepository(TeacherData);
        return teacherDataRepository.delete({id: id});
    }

    async existsById(id: number): Promise<boolean> {
        const teacherDataRepository: Repository<TeacherData> = getConnection().getRepository(TeacherData);
        return await teacherDataRepository.count({id: id}) > 0;
    }

    findById(id: number): Promise<Teacher> {
        const teacherDataRepository: Repository<TeacherData> = getConnection().getRepository(TeacherData);
        return this.mapper.dataToEntity(teacherDataRepository.findOneOrFail({id: id}));
    }

    findTeachers(): Promise<Teacher[]> {
        const teacherDataRepository: Repository<TeacherData> = getConnection().getRepository(TeacherData);
        return this.mapper.listDataToEntity(teacherDataRepository.find());
    }

    save(teacher: Teacher): Promise<Teacher> {
        const teacherDataRepository: Repository<TeacherData> = getConnection().getRepository(TeacherData);
        return this.mapper.dataToEntity(teacherDataRepository.save(this.mapper.entityToData(teacher)));
    }

    update(teacher: Teacher): Promise<UpdateResult> {
        const teacherDataRepository: Repository<TeacherData> = getConnection().getRepository(TeacherData);
        return teacherDataRepository.update({id: teacher.id}, {
            name: teacher.name,
            photo: teacher.photo,
            lastname: teacher.lastname,
            biography: teacher.biography,
            state: teacher.state
        });
    }

}