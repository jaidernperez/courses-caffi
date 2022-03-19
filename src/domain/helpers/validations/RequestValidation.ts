import * as Joi from "joi";
import {SlideRequest} from "../../usecases";

export class RequestValidation {

    public static validateRequest(request: SlideRequest, create: boolean): void {
        const {error} = (create) ? RequestValidation.getValidationSaveRequestSchema()
            .validate(request) : RequestValidation.getValidationUpdateRequestSchema().validate(request);

        if (error != null) {
            const {details} = error;
            const message = details.map(i => i.message).join(',').replace(/"/g, '');
            throw new Error('the field ' + message);
        }
    }

    private static getValidationSaveRequestSchema(): Joi.Schema {
        return Joi.object({
            title: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(5).required(),
            textButton: Joi.string().min(3).required(),
            url: Joi.string().uri().required(),
            image: Joi.string().required(),
            alternate: Joi.string().required(),
            type: Joi.number().valid(1, 2).required(),
            state: Joi.number().required(),
            video: Joi.string(),
        });
    }

    private static getValidationUpdateRequestSchema(): Joi.Schema {
        return Joi.object({
            id: Joi.required(),
            title: Joi.string().min(3).max(50).required(),
            description: Joi.string().min(5).required(),
            textButton: Joi.string().min(3).required(),
            url: Joi.string().uri().required(),
            image: Joi.string().required(),
            alternate: Joi.string().required(),
            type: Joi.number().valid(1, 2).required(),
            state: Joi.number().required(),
            video: Joi.string(),
        });
    }
}