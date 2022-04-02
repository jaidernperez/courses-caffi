import {TemplateDataMapper} from './template.data.mapper';
import {Template} from '../../../../domain/models';
import {TemplateData} from '../../template/template.data';
import {injectable} from 'inversify';

@injectable()
export class TemplateDataMapperImpl implements TemplateDataMapper {

    async dataToEntity(data: Promise<TemplateData>): Promise<Template> {
        let template: Template = new Template();
        await data.then(templateData => {
            template.id = templateData.id;
            template.siteName = templateData.siteName;
            template.description = templateData.description;
            template.logo = templateData.logo;
            template.phone = templateData.phone;
            template.address = templateData.address;
            template.city = templateData.city;
            template.facebookLink = templateData.siteName;
            template.instagramLink = templateData.instagramLink;
            template.youtubeLink = templateData.youtubeLink;
            template.whatsappLink = templateData.whatsappLink;
            template.merchantId = templateData.merchantId;
            template.accountId = templateData.accountId;
            template.apiKey = templateData.apiKey;
            template.sandbox = templateData.sandbox;
            template.createdDate = templateData.createdDate;
        });
        return Promise.resolve(template);
    }

    entityToData(entity: Template): TemplateData {
        let templateData = new TemplateData();
        if (entity.id !== null) templateData.id = entity.id;
        templateData.siteName = entity.siteName;
        templateData.description = entity.description;
        templateData.logo = entity.logo;
        templateData.phone = entity.phone;
        templateData.address = entity.address;
        templateData.city = entity.city;
        templateData.facebookLink = entity.siteName;
        templateData.instagramLink = entity.instagramLink;
        templateData.youtubeLink = entity.youtubeLink;
        templateData.whatsappLink = entity.whatsappLink;
        templateData.merchantId = entity.merchantId;
        templateData.accountId = entity.accountId;
        templateData.apiKey = entity.apiKey;
        templateData.sandbox = entity.sandbox;
        return templateData;
    }

    async listDataToEntity(listData: Promise<TemplateData[]>): Promise<Template[]> {
        let templateEntity = [];
        await listData.then(list => {
            list.forEach(templateData => {
                templateEntity.push(TemplateDataMapperImpl.dataToEntityObj(templateData));
            });
        });
        return templateEntity;
    }

    private static dataToEntityObj(data: TemplateData): Template {
        let template = new Template();
        template.id = data.id;
        template.siteName = data.siteName;
        template.description = data.description;
        template.logo = data.logo;
        template.phone = data.phone;
        template.address = data.address;
        template.city = data.city;
        template.facebookLink = data.siteName;
        template.instagramLink = data.instagramLink;
        template.youtubeLink = data.youtubeLink;
        template.whatsappLink = data.whatsappLink;
        template.merchantId = data.merchantId;
        template.accountId = data.accountId;
        template.apiKey = data.apiKey;
        template.sandbox = data.sandbox;
        return template;
    }

}