import {SlideMapperDomain} from "./SlideMapperDomain";
import {Slide} from "../models";
import {SlideRequest, SlideResponse} from "../usecases";
import {injectable} from "inversify";

@injectable()
export class SlideMapperDomainImpl implements SlideMapperDomain{

    entityToResponse(entity: Promise<Slide>): Promise<SlideResponse> {
        return Promise.resolve(undefined);
    }

    listEntityToResponse(entityList: Promise<Slide[]>): Promise<SlideResponse[]> {
        return Promise.resolve([]);
    }

    requestToEntity(request: SlideRequest): Slide {
        return undefined;
    }

}