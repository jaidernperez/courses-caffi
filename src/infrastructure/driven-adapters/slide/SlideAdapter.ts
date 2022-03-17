import {inject, injectable} from "inversify";
import {DeleteResult} from "typeorm";
import {Slide, SlideRepository} from "../../../domain/models";
import {SlideMapperData} from "../mappers/SlideMapperData";

@injectable()
export class SlideAdapter implements SlideRepository {

    constructor(@inject(Symbol.for("SlideMapperData")) private mapper: SlideMapperData) {
    }

    delete(id: number): Promise<DeleteResult> {
        return Promise.resolve(undefined);
    }

    existsById(id: number): Promise<boolean> {
        return Promise.resolve(false);
    }

    findAll(): Promise<Slide[]> {
        return Promise.resolve([]);
    }

    findByDocument(document: string): Promise<Slide> {
        return Promise.resolve(undefined);
    }

    findById(id: number): Promise<Slide> {
        return Promise.resolve(undefined);
    }

    save(person: Slide): Promise<Slide> {
        return Promise.resolve(undefined);
    }

}