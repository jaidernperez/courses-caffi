import {DeleteResult} from "typeorm";
import {Slide} from "../Slide";

export interface SlideRepository {

    save(person: Slide): Promise<Slide>;

    findById(id: number): Promise<Slide>;

    findByDocument(document: string): Promise<Slide>;

    findAll(): Promise<Slide[]>;

    delete(id: number): Promise<DeleteResult>;

    existsById(id: number): Promise<boolean>;

}