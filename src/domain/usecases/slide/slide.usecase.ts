import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {SlideRepository} from '../../models';
import {SlideDomainMapper} from '../../mappers';
import {SlideRequest} from '../dtos/request/slide.request';
import {SlideResponse} from '../dtos/response/slide.response';
import {RequestSlideValidation} from '../../helpers';
import {Constants} from '../../constants/constants';
import {HttpException} from '../../exceptions/http.exception';

@injectable()
export class SlideUseCase {

    constructor(@inject(Symbol.for('SlideRepository')) private repository: SlideRepository,
                @inject(Symbol.for('SlideDomainMapper')) private mapper: SlideDomainMapper) {
    }

    getSlides(): Promise<SlideResponse[]> {
        return this.mapper.listEntityToResponse(this.repository.findAll());
    }

    findSlideById(id: number): Promise<SlideResponse> {
        return this.mapper.entityToResponse(this.repository.findById(id)).catch(() => {
            throw new HttpException(404, Constants.SLIDE_NOT_FOUND);
        });
    }

    saveSlide(request: SlideRequest): Promise<SlideResponse> {
        return RequestSlideValidation.validateRequest(request, true).then(() =>
            this.mapper.entityToResponse(this.repository.save(this.mapper.requestToEntity(request)))
        );
    }

    async updateSlide(request: SlideRequest): Promise<string> {
        return RequestSlideValidation.validateRequest(request, false).then(() =>
            this.validateSlideId(request.id).then(async () => {
                if ((await this.repository.update(this.mapper.requestToEntity(request))).affected == 1) {
                    return Promise.resolve(Constants.SLIDE_UPDATE_SUCCESSFULLY);
                }
            }));
    }

    async deleteSlide(id: number): Promise<String> {
        if ((await this.repository.delete(id)).affected == 1) {
            return Promise.resolve(Constants.SLIDE_DELETED_SUCCESSFULLY);
        } else {
            return Promise.reject(new HttpException(404, Constants.SLIDE_NOT_FOUND));
        }
    }

    private async validateSlideId(id: number): Promise<void> {
        return await this.repository.existsById(id).then(value => {
            if (!value) {
                return Promise.reject(new HttpException(404, Constants.SLIDE_NOT_FOUND));
            }
        });
    }

}