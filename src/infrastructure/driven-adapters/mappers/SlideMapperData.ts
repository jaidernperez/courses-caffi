import {SlideData} from "../slide/SlideData";
import {Slide} from "../../../domain/models";

export interface SlideMapperData {

    dataToEntity(data: Promise<SlideData>): Promise<Slide>;

    entityToData(entity: Slide): SlideData;

    listDataToEntity(listData: Promise<SlideData[]>): Promise<Slide[]>;
}