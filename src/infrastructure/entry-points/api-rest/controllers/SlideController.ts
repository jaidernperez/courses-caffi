import "reflect-metadata";
import {inject, injectable} from "inversify";
import * as express from "express";
import {SlideUseCase} from "../../../../domain/usecases";
import {HttpException} from "../../../../domain/exceptions/HttpException";

@injectable()
export class SlideController {

    constructor(@inject(Symbol.for("SlideUseCase")) private loanUseCase: SlideUseCase) {
    }

    public routes(app: express.Application): void {
        app.route("/slides").get((req: express.Request, res: express.Response) => {
            this.loanUseCase.getSlides().then((response) => {
                SlideController.doResponse(res, response, 200);
            });
        }).post((req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                this.loanUseCase.saveSlide(req.body).then(response => {
                    SlideController.doResponse(res, response, 201);
                })
            } catch (e) {
                //SlideController.doErrorResponse(res, 400, e.message);
                next(new HttpException(404, e.message));
            }
        });
    }

    private static doErrorResponse(res: express.Response, statusCode: number, message: string): express.Response {
        return res.status(statusCode).send({
            validationError: message
        });
    }

    private static doResponse(res: express.Response, response: any, statusCode: number): express.Response {
        return res.status(statusCode).send({
            response
        });
    }
}