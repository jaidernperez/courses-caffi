import {injectable} from 'inversify';
import {SlideDataMapper} from './slide.data.mapper';
import {SlideData} from '../../slide/slide.data';
import {Slide} from '../../../../domain/models';

@injectable()
export class SlideDataMapperImpl implements SlideDataMapper {

    async dataToEntity(data: Promise<SlideData>): Promise<Slide> {
        let slide: Slide = new Slide();
        await data.then(slideData => {
            slide.id = slideData.id;
            slide.title = slideData.title;
            slide.description = slideData.description;
            slide.textButton = slideData.textButton;
            slide.url = slideData.url;
            slide.image = slideData.image;
            slide.alternate = slideData.alternate;
            slide.type = slideData.type;
            slide.state = slideData.state;
            slide.video = slideData.video;
            slide.createdDate = slideData.createdDate;
        });
        return Promise.resolve(slide);
    }

    entityToData(entity: Slide): SlideData {
        let sideData: SlideData = new SlideData();
        if (entity.id !== null) sideData.id = entity.id;
        sideData.title = entity.title;
        sideData.description = entity.description;
        sideData.textButton = entity.textButton;
        sideData.url = entity.url;
        sideData.image = entity.image;
        sideData.alternate = entity.alternate;
        sideData.type = entity.type;
        sideData.state = entity.state;
        sideData.video = entity.video;
        sideData.createdDate = entity.createdDate;
        return sideData;
    }

    async listDataToEntity(listData: Promise<SlideData[]>): Promise<Slide[]> {
        let slideEntity = [];
        await listData.then(list => {
            list.forEach(slideData => {
                slideEntity.push(SlideDataMapperImpl.dataToEntityObj(slideData));
            });
        });
        return slideEntity;
    }

    private static dataToEntityObj(data: SlideData): Slide {
        let slide = new Slide();
        slide.id = data.id;
        slide.title = data.title;
        slide.description = data.description;
        slide.textButton = data.textButton;
        slide.url = data.url;
        slide.image = data.image;
        slide.alternate = data.alternate;
        slide.type = data.type;
        slide.state = data.state;
        slide.video = data.video;
        slide.createdDate = data.createdDate;
        return slide;
    }

}