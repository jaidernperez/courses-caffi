import {TemplateDomainMapper} from './template.domain.mapper';
import {TemplateRequest, TemplateResponse} from '../../usecases';
import {Template} from '../../models';
import {injectable} from 'inversify';

@injectable()
export class TemplateDomainMapperImpl implements TemplateDomainMapper {

    async entityToResponse(entity: Promise<Template>): Promise<TemplateResponse> {
        let templateResponse = new TemplateResponse();
        await entity.then(template => {
            templateResponse.id = template.id;
            templateResponse.siteName = template.siteName;
            templateResponse.description = template.description;
            templateResponse.logo = template.logo;
            templateResponse.phone = template.phone;
            templateResponse.email = template.email;
            templateResponse.address = template.address;
            templateResponse.city = template.city;
            templateResponse.facebookLink = template.facebookLink;
            templateResponse.instagramLink = template.instagramLink;
            templateResponse.youtubeLink = template.youtubeLink;
            templateResponse.whatsappLink = template.whatsappLink;
        });
        return Promise.resolve(templateResponse);
    }

    requestToEntity(request: TemplateRequest): Template {
        let templateEntity = new Template();
        if (request.id !== null) templateEntity.id = request.id;
        templateEntity.siteName = request.siteName;
        templateEntity.description = request.description;
        templateEntity.logo = request.logo;
        templateEntity.phone = request.phone;
        templateEntity.address = request.address;
        templateEntity.city = request.city;
        templateEntity.facebookLink = request.siteName;
        templateEntity.instagramLink = request.instagramLink;
        templateEntity.youtubeLink = request.youtubeLink;
        templateEntity.whatsappLink = request.whatsappLink;
        templateEntity.merchantId = request.merchantId;
        templateEntity.accountId = request.accountId;
        templateEntity.apiKey = request.apiKey;
        templateEntity.sandbox = request.sandbox;
        return templateEntity;
    }

    async listEntityToResponse(entityList: Promise<Template[]>): Promise<TemplateResponse[]> {
        let templateResponse = [];
        await entityList.then(list => {
            list.forEach(template => {
                templateResponse.push(TemplateDomainMapperImpl.entityToResponseObj(template));
            });
        });
        return templateResponse;
    }

    private static entityToResponseObj(entity: Template): TemplateResponse {
        let templateResponse = new TemplateResponse();
        templateResponse.siteName = entity.siteName;
        templateResponse.description = entity.description;
        templateResponse.logo = entity.logo;
        templateResponse.phone = entity.phone;
        templateResponse.address = entity.address;
        templateResponse.city = entity.city;
        templateResponse.facebookLink = entity.siteName;
        templateResponse.instagramLink = entity.instagramLink;
        templateResponse.youtubeLink = entity.youtubeLink;
        templateResponse.whatsappLink = entity.whatsappLink;
        return templateResponse;
    }

}