import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {TeacherRepository} from '../../models';
import {TeacherDomainMapper} from '../../mappers';
import {TeacherResponse} from '../dtos/response/teacher.response';
import {HttpException} from '../../exceptions/http.exception';
import {Constants} from '../../constants/constants';
import {RequestTeacherValidation} from '../../helpers';
import {TeacherRequest} from '../dtos/request/teacher.request';

@injectable()
export class TeacherUseCase {

    constructor(@inject(Symbol.for('TeacherRepository')) private repository: TeacherRepository,
                @inject(Symbol.for('TeacherDomainMapper')) private mapper: TeacherDomainMapper) {
    }

    getTeachers(): Promise<TeacherResponse[]> {
        return this.mapper.listEntityToResponse(this.repository.findTeachers()).then(list => {
            return list.sort(() => Math.random() - Math.random()).slice(0, 3);
        });
    }

    getTeacherById(id: number): Promise<TeacherResponse> {
        return this.mapper.entityToResponse(this.repository.findById(id)).catch(() => {
            throw new HttpException(404, Constants.TEACHER_NOT_FOUND);
        });
    }

    saveTeacher(request: TeacherRequest): Promise<TeacherResponse> {
        return RequestTeacherValidation.validateRequest(request, true).then(() =>
            this.mapper.entityToResponse(this.repository.save(this.mapper.requestToEntity(request)))
        );
    }

    async updateTeacher(request: TeacherRequest): Promise<string> {
        return RequestTeacherValidation.validateRequest(request, false).then(() =>
            this.validateTeacherId(request.id).then(async () => {
                if ((await this.repository.update(this.mapper.requestToEntity(request))).affected == 1) {
                    return Promise.resolve(Constants.TEACHER_UPDATE_SUCCESSFULLY);
                }
            }));
    }

    async deleteTeacher(id: number): Promise<String> {
        if ((await this.repository.delete(id)).affected == 1) {
            return Promise.resolve(Constants.TEACHER_DELETED_SUCCESSFULLY);
        } else {
            return Promise.reject(new HttpException(404, Constants.TEACHER_NOT_FOUND));
        }
    }

    private async validateTeacherId(id: number): Promise<void> {
        return await this.repository.existsById(id).then(value => {
            if (!value) {
                return Promise.reject(new HttpException(404, Constants.TEACHER_NOT_FOUND));
            }
        });
    }
}