import {Teacher} from '../../models';
import {TeacherRequest, TeacherResponse} from '../../usecases';

export interface TeacherDomainMapper {

    entityToResponse(entity: Promise<Teacher>): Promise<TeacherResponse>;

    requestToEntity(request: TeacherRequest): Teacher;

    listEntityToResponse(entityList: Promise<Teacher[]>): Promise<TeacherResponse[]>;
}