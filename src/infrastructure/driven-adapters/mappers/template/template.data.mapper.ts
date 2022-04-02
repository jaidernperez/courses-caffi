import {TemplateData} from '../../template/template.data';
import {Template} from '../../../../domain/models';


export interface TemplateDataMapper {

    dataToEntity(data: Promise<TemplateData>): Promise<Template>;

    entityToData(entity: Template): TemplateData;

    listDataToEntity(listData: Promise<TemplateData[]>): Promise<Template[]>;

}