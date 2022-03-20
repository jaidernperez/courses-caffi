import {DeleteResult, UpdateResult} from "typeorm";
import {Slide} from "../Slide";

export interface SlideRepository {

    save(slide: Slide): Promise<Slide>;

    update(slide: Slide): Promise<UpdateResult>;

    findById(id: number): Promise<Slide>;

    findAll(): Promise<Slide[]>;

    delete(id: number): Promise<DeleteResult>;

    existsById(id: number): Promise<boolean>;

}