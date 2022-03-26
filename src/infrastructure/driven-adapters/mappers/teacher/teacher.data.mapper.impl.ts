import {TeacherDataMapper} from './teacher.data.mapper';
import {TeacherData} from '../../teacher/teacher.data';
import {Teacher} from '../../../../domain/models';
import {injectable} from 'inversify';

@injectable()
export class TeacherDataMapperImpl implements TeacherDataMapper {

    async dataToEntity(data: Promise<TeacherData>): Promise<Teacher> {
        let teacher: Teacher = new Teacher();
        await data.then(teacherData => {
            teacher.id = teacherData.id;
            teacher.name = teacherData.name;
            teacher.photo = teacherData.photo;
            teacher.lastname = teacherData.lastname;
            teacher.biography = teacherData.biography;
            teacher.state = teacherData.state;
            teacher.createdDate = teacherData.createdDate;
        });
        return Promise.resolve(teacher);
    }

    entityToData(entity: Teacher): TeacherData {
        let teacherData: TeacherData = new TeacherData();
        if (entity.id !== null) teacherData.id = entity.id;
        teacherData.name = entity.name;
        teacherData.photo = entity.photo;
        teacherData.lastname = entity.lastname;
        teacherData.biography = entity.biography;
        teacherData.state = entity.state;
        teacherData.createdDate = entity.createdDate;
        return teacherData;
    }

    async listDataToEntity(listData: Promise<TeacherData[]>): Promise<Teacher[]> {
        let teacherEntity = [];
        await listData.then(list => {
            list.forEach(teacherData => {
                teacherEntity.push(TeacherDataMapperImpl.dataToEntityObj(teacherData));
            });
        });
        return teacherEntity;
    }

    private static dataToEntityObj(data: TeacherData): Teacher {
        let teacher = new Teacher();
        teacher.id = data.id;
        teacher.name = data.name;
        teacher.photo = data.photo;
        teacher.lastname = data.lastname;
        teacher.biography = data.biography;
        teacher.state = data.state;
        teacher.createdDate = data.createdDate;
        return teacher;
    }

}