import "reflect-metadata";
import {inject, injectable} from "inversify";
import {SlideRepository} from "../../models";
import {SlideMapperDomain} from "../../mappers";
import {SlideRequest} from "../dtos/request/SlideRequest";
import {SlideResponse} from "../dtos/response/SlideResponse";
import {RequestValidation} from "../../helpers";
import {Constants} from "../../constants/Constants";
import {HttpException} from "../../exceptions/HttpException";

@injectable()
export class SlideUseCase {

    constructor(@inject(Symbol.for('SlideRepository')) private repository: SlideRepository,
                @inject(Symbol.for('SlideMapperDomain')) private mapper: SlideMapperDomain) {
    }

    getSlides(): Promise<SlideResponse[]> {
        return this.mapper.listEntityToResponse(this.repository.findAll());
    }

    saveSlide(request: SlideRequest): Promise<SlideResponse> {
        return RequestValidation.validateRequest(request, true).then(() =>
            this.mapper.entityToResponse(this.repository.save(this.mapper.requestToEntity(request)))
        );
    }

    updateSlide(request: SlideRequest): Promise<SlideResponse> {
        return RequestValidation.validateRequest(request, false).then(() =>
            this.validateSlideId(request.id).then(() =>
                this.mapper.entityToResponse(this.repository.update(this.mapper.requestToEntity(request)))
            ));
    }

    private async validateSlideId(id: number): Promise<void> {
        return await this.repository.existsById(id).then(value => {
            if (!value) {
                Promise.reject(new HttpException(404, Constants.SLIDE_NOT_FOUND));
            }
        });
    }

}