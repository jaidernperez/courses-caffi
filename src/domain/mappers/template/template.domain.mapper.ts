import {Template} from '../../models';
import {TemplateRequest, TemplateResponse} from '../../usecases';

export interface TemplateDomainMapper {
    
    entityToResponse(entity: Promise<Template>): Promise<TemplateResponse>;

    requestToEntity(request: TemplateRequest): Template;

    listEntityToResponse(entityList: Promise<Template[]>): Promise<TemplateResponse[]>;
}