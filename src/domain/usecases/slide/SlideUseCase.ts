import "reflect-metadata";
import {injectable} from "inversify";

@injectable()
export class SlideUseCase {

    constructor() {
    }

    public home(): Promise<string> {
        return new Promise<string>((resolve, reject) => resolve("Bienvenido!"));
    }
}