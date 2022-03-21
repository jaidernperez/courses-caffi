import {inject, injectable} from 'inversify';
import {DeleteResult, getConnection, Repository, UpdateResult} from 'typeorm';
import {Slide, SlideRepository} from '../../../domain/models';
import {SlideDataMapper} from '../mappers/slide.data.mapper';
import {SlideData} from './slide.data';

@injectable()
export class SlideAdapter implements SlideRepository {

    constructor(@inject(Symbol.for('SlideDataMapper')) private mapper: SlideDataMapper) {
    }

    delete(id: number): Promise<DeleteResult> {
        const slideDataRepository: Repository<SlideData> = getConnection().getRepository(SlideData);
        return slideDataRepository.delete({id: id});
    }

    async existsById(id: number): Promise<boolean> {
        const slideDataRepository: Repository<SlideData> = getConnection().getRepository(SlideData);
        return await slideDataRepository.count({id: id}) > 0;
    }

    findAll(): Promise<Slide[]> {
        const slideDataRepository: Repository<SlideData> = getConnection().getRepository(SlideData);
        return this.mapper.listDataToEntity(slideDataRepository.find());
    }

    findById(id: number): Promise<Slide> {
        const slideDataRepository: Repository<SlideData> = getConnection().getRepository(SlideData);
        return this.mapper.dataToEntity(slideDataRepository.findOneOrFail({id: id}));
    }

    update(slide: Slide): Promise<UpdateResult> {
        const slideDataRepository: Repository<SlideData> = getConnection().getRepository(SlideData);
        return slideDataRepository.update({id: slide.id}, {
            title: slide.title,
            description: slide.description,
            textButton: slide.textButton,
            url: slide.url,
            image: slide.image,
            alternate: slide.alternate,
            type: slide.type,
            state: slide.state,
            video: slide.video
        });
    }

    save(slide: Slide): Promise<Slide> {
        const slideDataRepository: Repository<SlideData> = getConnection().getRepository(SlideData);
        return this.mapper.dataToEntity(slideDataRepository.save(this.mapper.entityToData(slide)));
    }

}