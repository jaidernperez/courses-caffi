import {injectable} from "inversify";
import {SlideMapperData} from "./SlideMapperData";
import {SlideData} from "../slide/SlideData";
import {Slide} from "../../../domain/models";

@injectable()
export class SlideMapperDataImpl implements SlideMapperData{

    dataToEntity(data: Promise<SlideData>): Promise<Slide> {
        return Promise.resolve(undefined);
    }

    entityToData(entity: Slide): SlideData {
        return undefined;
    }

    listDataToEntity(listData: Promise<SlideData[]>): Promise<Slide[]> {
        return Promise.resolve([]);
    }

}