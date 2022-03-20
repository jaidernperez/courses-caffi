import "reflect-metadata";
import {inject, injectable} from "inversify";
import {Application, NextFunction, Request, Response} from 'express';
import {SlideUseCase} from "../../../../domain/usecases";

@injectable()
export class SlideController {

    constructor(@inject(Symbol.for("SlideUseCase")) private loanUseCase: SlideUseCase) {
    }

    public routes(app: Application): void {
        app.route("/slides").get((req: Request, res: Response, next: NextFunction) => {
            this.loanUseCase.getSlides().then((data) => {
                SlideController.doResponse(res, data, 200);
            });
        }).post((req: Request, res: Response, next: NextFunction) => {
            this.loanUseCase.saveSlide(req.body).then(data => {
                SlideController.doResponse(res, data, 201);
            }).catch(reason => {
                next(reason);
            });
        });
    }

    private static doResponse(res: Response, data: any, statusCode: number): Response {
        return res.status(statusCode).send({
            data
        });
    }
}