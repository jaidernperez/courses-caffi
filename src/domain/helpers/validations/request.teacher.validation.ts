import {TeacherRequest} from '../../usecases';
import {HttpException} from '../../exceptions/http.exception';
import * as Joi from 'joi';

export class RequestTeacherValidation {

    public static validateRequest(request: TeacherRequest, create: boolean): Promise<void> {
        const {error} = (create) ? RequestTeacherValidation.getValidationSaveRequestSchema()
            .validate(request) : RequestTeacherValidation.getValidationUpdateRequestSchema().validate(request);

        if (error != null) {
            const {details} = error;
            const message = details.map(i => i.message).join(',').replace(/"/g, '');
            return Promise.reject(new HttpException(400, 'the field ' + message));
        }
        return Promise.resolve();
    }

    private static getValidationSaveRequestSchema(): Joi.Schema {
        return Joi.object({
            name: Joi.string().min(3).max(50).required(),
            photo: Joi.string().required(),
            lastname: Joi.string().min(3).max(50).required(),
            biography: Joi.string().min(3).required(),
            state: Joi.number().required(),
        });
    }

    private static getValidationUpdateRequestSchema(): Joi.Schema {
        return Joi.object({
            id: Joi.required(),
            name: Joi.string().min(3).max(50).required(),
            photo: Joi.string().required(),
            lastname: Joi.string().min(3).max(50).required(),
            biography: Joi.string().min(3).required(),
            state: Joi.number().required(),
        });
    }
}