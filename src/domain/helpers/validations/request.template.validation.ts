import {TemplateRequest} from '../../usecases';
import {HttpException} from '../../exceptions/http.exception';
import * as Joi from 'joi';

export class RequestTemplateValidation {

    public static validateRequest(request: TemplateRequest, create: boolean): Promise<void> {
        const {error} = (create) ? RequestTemplateValidation.getValidationSaveRequestSchema()
            .validate(request) : RequestTemplateValidation.getValidationUpdateRequestSchema().validate(request);

        if (error != null) {
            const {details} = error;
            const message = details.map(i => i.message).join(',').replace(/"/g, '');
            return Promise.reject(new HttpException(400, 'the field ' + message));
        }
        return Promise.resolve();
    }

    private static getValidationSaveRequestSchema(): Joi.Schema {
        return Joi.object({
            siteName: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(3).max(200).required(),
            logo: Joi.string().required(),
            phone: Joi.string().alphanum().required(),
            email: Joi.string().email().required(),
            address: Joi.string().alphanum().required(),
            city: Joi.string().min(3).required(),
            facebookLink: Joi.string().uri().required(),
            instagramLink: Joi.string().uri().required(),
            youtubeLink: Joi.string().uri().required(),
            whatsappLink: Joi.string().required(),
            merchantId: Joi.number().required(),
            accountId: Joi.number().required(),
            apiKey: Joi.number().required(),
            sandbox: Joi.number().valid([0, 1]).required(),
        });
    }

    private static getValidationUpdateRequestSchema(): Joi.Schema {
        return Joi.object({
            id: Joi.required(),
            siteName: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(3).max(200).required(),
            logo: Joi.string().required(),
            phone: Joi.string().alphanum().required(),
            email: Joi.string().email().required(),
            address: Joi.string().alphanum().required(),
            city: Joi.string().min(3).required(),
            facebookLink: Joi.string().uri().required(),
            instagramLink: Joi.string().uri().required(),
            youtubeLink: Joi.string().uri().required(),
            whatsappLink: Joi.string().required(),
            merchantId: Joi.number().required(),
            accountId: Joi.number().required(),
            apiKey: Joi.number().required(),
            sandbox: Joi.number().valid([0, 1]).required(),
        });
    }
}