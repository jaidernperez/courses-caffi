import "reflect-metadata";
import {inject, injectable} from "inversify";
import * as express from "express";
import {SlideUseCase} from "../../../../domain/usecases";

@injectable()
export class SlideController {

    constructor(@inject(Symbol.for("SlideUseCase")) private loanUseCase: SlideUseCase) {
    }

    public routes(app: express.Application): void {
        app.route("/home").get((req: express.Request, res: express.Response) => {
            this.loanUseCase.home().then((response) => {
                res.status(200).send({
                    message: response
                });
            })
        })
    }
}