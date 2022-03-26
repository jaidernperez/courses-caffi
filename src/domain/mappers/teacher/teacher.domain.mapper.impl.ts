import {TeacherDomainMapper} from './teacher.domain.mapper';
import {TeacherRequest, TeacherResponse} from '../../usecases';
import {Teacher} from '../../models';
import {injectable} from 'inversify';

@injectable()
export class TeacherDomainMapperImpl implements TeacherDomainMapper {

    async entityToResponse(entity: Promise<Teacher>): Promise<TeacherResponse> {
        let teacherResponse = new TeacherResponse();
        await entity.then(teacher => {
            teacherResponse.id = teacher.id;
            teacherResponse.name = teacher.name;
            teacherResponse.photo = teacher.photo;
            teacherResponse.lastname = teacher.lastname;
            teacherResponse.biography = teacher.biography;
            teacherResponse.state = teacher.state;
        });
        return Promise.resolve(teacherResponse);
    }

    requestToEntity(request: TeacherRequest): Teacher {
        let teacherEntity = new Teacher();
        if (request.id !== null) teacherEntity.id = request.id;
        teacherEntity.name = request.name;
        teacherEntity.photo = request.photo;
        teacherEntity.lastname = request.lastname;
        teacherEntity.biography = request.biography;
        teacherEntity.state = request.state;
        return teacherEntity;
    }

    async listEntityToResponse(entityList: Promise<Teacher[]>): Promise<TeacherResponse[]> {
        let teacherResponse = [];
        await entityList.then(list => {
            list.forEach(teacher => {
                teacherResponse.push(TeacherDomainMapperImpl.entityToResponseObj(teacher));
            });
        });
        return teacherResponse;
    }

    private static entityToResponseObj(entity: Teacher): TeacherResponse {
        let teacherResponse = new TeacherResponse();
        teacherResponse.id = entity.id;
        teacherResponse.name = entity.name;
        teacherResponse.photo = entity.photo;
        teacherResponse.lastname = entity.lastname;
        teacherResponse.biography = entity.biography;
        teacherResponse.state = entity.state;
        return teacherResponse;
    }

}