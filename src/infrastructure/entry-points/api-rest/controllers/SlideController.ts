import "reflect-metadata";
import {inject, injectable} from "inversify";
import {Application, NextFunction, Request, Response} from 'express';
import {SlideUseCase} from "../../../../domain/usecases";

@injectable()
export class SlideController {

    constructor(@inject(Symbol.for("SlideUseCase")) private slideUseCase: SlideUseCase) {
    }

    public routes(app: Application): void {
        app.route('/slides').get((req: Request, res: Response, next: NextFunction) => {
            this.slideUseCase.getSlides().then((slides) => {
                res.status(200).send({slides});
            });
        }).post((req: Request, res: Response, next: NextFunction) => {
            this.slideUseCase.saveSlide(req.body).then(slide => {
                res.status(201).send({slide});
            }).catch(reason => {
                next(reason);
            });
        }).put((req: Request, res: Response, next: NextFunction) => {
            this.slideUseCase.updateSlide(req.body).then(result => {
                res.status(200).send({result});
            }).catch(reason => {
                next(reason);
            })
        });

        app.route('/slides/:id').get((req: Request, res: Response, next: NextFunction) => {
            this.slideUseCase.findSlideById(Number(req.params.id)).then((slide) => {
                res.status(200).send({slide});
            });
        }).delete((req: Request, res: Response, next: NextFunction) => {
            this.slideUseCase.deleteSlide(Number(req.params.id)).then(result => {
                res.status(200).send({result});
            });
        });
    }

}