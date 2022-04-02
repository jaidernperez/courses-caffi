import {UpdateResult} from 'typeorm';
import {Template} from '../template';

export interface TemplateRepository {

    save(template: Template): Promise<Template>;

    update(template: Template): Promise<UpdateResult>;

    findById(id: number): Promise<Template>;

    findTemplates(): Promise<Template[]>;

    existsById(id: number): Promise<boolean>;
}