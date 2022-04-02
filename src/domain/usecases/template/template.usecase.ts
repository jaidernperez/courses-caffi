import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {TemplateRepository} from '../../models';
import {TemplateDomainMapper} from '../../mappers';
import {TemplateResponse} from '../dtos/response/template.response';
import {HttpException} from '../../exceptions/http.exception';
import {Constants} from '../../constants/constants';
import {TemplateRequest} from '../dtos/request/template.request';
import {RequestTemplateValidation} from '../../helpers/validations/request.template.validation';

@injectable()
export class TemplateUseCase {

    constructor(@inject(Symbol.for('TemplateRepository')) private repository: TemplateRepository,
                @inject(Symbol.for('TemplateDomainMapper')) private mapper: TemplateDomainMapper) {
    }

    getTemplates(): Promise<TemplateResponse[]> {
        return this.mapper.listEntityToResponse(this.repository.findTemplates());
    }

    findTemplateById(id: number): Promise<TemplateResponse> {
        return this.mapper.entityToResponse(this.repository.findById(id)).catch(() => {
            throw new HttpException(404, Constants.TEMPLATE_NOT_FOUND);
        });
    }

    saveTemplate(request: TemplateRequest): Promise<TemplateResponse> {
        return RequestTemplateValidation.validateRequest(request, true).then(() =>
            this.mapper.entityToResponse(this.repository.save(this.mapper.requestToEntity(request)))
        );
    }

    async updateTemplate(request: TemplateRequest): Promise<string> {
        return RequestTemplateValidation.validateRequest(request, false).then(() =>
            this.validateTemplateId(request.id).then(async () => {
                if ((await this.repository.update(this.mapper.requestToEntity(request))).affected == 1) {
                    return Promise.resolve(Constants.TEMPLATE_UPDATE_SUCCESSFULLY);
                }
            }));
    }

    private async validateTemplateId(id: number): Promise<void> {
        return await this.repository.existsById(id).then(value => {
            if (!value) {
                return Promise.reject(new HttpException(404, Constants.TEMPLATE_NOT_FOUND));
            }
        });
    }
}