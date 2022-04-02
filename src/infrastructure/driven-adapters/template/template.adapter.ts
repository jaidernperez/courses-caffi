import {Template, TemplateRepository} from '../../../domain/models';
import {getConnection, Repository, UpdateResult} from 'typeorm';
import {inject, injectable} from 'inversify';
import {TemplateDataMapper} from '../mappers/template/template.data.mapper';
import {TemplateData} from './template.data';

@injectable()
export class TemplateAdapter implements TemplateRepository {

    constructor(@inject(Symbol.for('TemplateDataMapper')) private mapper: TemplateDataMapper) {
    }

    async existsById(id: number): Promise<boolean> {
        const templateDataRepository: Repository<TemplateData> = getConnection().getRepository(TemplateData);
        return await templateDataRepository.count({id: id}) > 0;
    }

    findById(id: number): Promise<Template> {
        const templateDataRepository: Repository<TemplateData> = getConnection().getRepository(TemplateData);
        return this.mapper.dataToEntity(templateDataRepository.findOneOrFail({id: id}));
    }

    findTemplates(): Promise<Template[]> {
        const templateDataRepository: Repository<TemplateData> = getConnection().getRepository(TemplateData);
        return this.mapper.listDataToEntity(templateDataRepository.find());
    }

    save(template: Template): Promise<Template> {
        const templateDataRepository: Repository<TemplateData> = getConnection().getRepository(TemplateData);
        return this.mapper.dataToEntity(templateDataRepository.save(this.mapper.entityToData(template)));
    }

    update(template: Template): Promise<UpdateResult> {
        const templateDataRepository: Repository<TemplateData> = getConnection().getRepository(TemplateData);
        return templateDataRepository.update({id: template.id}, {
            siteName: template.siteName,
            description: template.description,
            logo: template.logo,
            phone: template.phone,
            email: template.email,
            address: template.address,
            city: template.city,
            facebookLink: template.facebookLink,
            instagramLink: template.instagramLink,
            youtubeLink: template.youtubeLink,
            whatsappLink: template.whatsappLink,
            merchantId: template.merchantId,
            accountId: template.accountId,
            apiKey: template.apiKey,
            sandbox: template.sandbox,
        });
    }

}