import "reflect-metadata";
import {inject, injectable} from "inversify";
import {SlideRepository} from "../../models";

@injectable()
export class SlideUseCase {

    constructor(@inject(Symbol.for('SlideRepository')) private repository: SlideRepository) {
    }

    public saveSlide(): Promise<string> {
        return new Promise<string>((resolve, reject) => resolve("Save slide"));
    }

    public getSlides(): Promise<string> {
        return new Promise<string>((resolve, reject) => resolve("get All slides"));
    }
}