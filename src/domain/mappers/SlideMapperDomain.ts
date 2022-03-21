import {SlideRequest, SlideResponse} from '../usecases';
import {Slide} from '../models';

export interface SlideMapperDomain {

    entityToResponse(entity: Promise<Slide>): Promise<SlideResponse>;

    requestToEntity(request: SlideRequest): Slide;

    listEntityToResponse(entityList: Promise<Slide[]>): Promise<SlideResponse[]>;

}