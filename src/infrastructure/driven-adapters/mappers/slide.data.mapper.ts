import {SlideData} from '../slide/slide.data';
import {Slide} from '../../../domain/models';

export interface SlideDataMapper {

    dataToEntity(data: Promise<SlideData>): Promise<Slide>;

    entityToData(entity: Slide): SlideData;

    listDataToEntity(listData: Promise<SlideData[]>): Promise<Slide[]>;
}