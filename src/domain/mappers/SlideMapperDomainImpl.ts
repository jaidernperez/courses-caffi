import {SlideMapperDomain} from './SlideMapperDomain';
import {Slide} from '../models';
import {SlideRequest, SlideResponse} from '../usecases';
import {injectable} from 'inversify';

@injectable()
export class SlideMapperDomainImpl implements SlideMapperDomain {

    async entityToResponse(entity: Promise<Slide>): Promise<SlideResponse> {
        let slideResponse = new SlideResponse();
        await entity.then(slide => {
            slideResponse.id = slide.id;
            slideResponse.title = slide.title;
            slideResponse.description = slide.description;
            slideResponse.textButton = slide.textButton;
            slideResponse.url = slide.url;
            slideResponse.image = slide.image;
            slideResponse.alternate = slide.alternate;
            slideResponse.type = slide.type;
            slideResponse.state = slide.state;
            slideResponse.video = slide.video;
        });
        return Promise.resolve(slideResponse);
    }

    requestToEntity(request: SlideRequest): Slide {
        let slideEntity = new Slide();
        if (request.id !== null) slideEntity.id = request.id;
        slideEntity.title = request.title;
        slideEntity.description = request.description;
        slideEntity.textButton = request.textButton;
        slideEntity.url = request.url;
        slideEntity.image = request.image;
        slideEntity.alternate = request.alternate;
        slideEntity.type = request.type;
        slideEntity.state = request.state;
        slideEntity.video = request.video;
        return slideEntity;
    }

    async listEntityToResponse(entityList: Promise<Slide[]>): Promise<SlideResponse[]> {
        let slideResponse = [];
        await entityList.then(list => {
            list.forEach(slide => {
                slideResponse.push(SlideMapperDomainImpl.entityToResponseObj(slide));
            });
        });
        return slideResponse;
    }

    private static entityToResponseObj(entity: Slide): SlideResponse {
        let slideResponse = new SlideResponse();
        slideResponse.id = entity.id;
        slideResponse.title = entity.title;
        slideResponse.description = entity.description;
        slideResponse.textButton = entity.textButton;
        slideResponse.url = entity.url;
        slideResponse.image = entity.image;
        slideResponse.alternate = entity.alternate;
        slideResponse.type = entity.type;
        slideResponse.state = entity.state;
        slideResponse.video = entity.video;
        return slideResponse;
    }

}