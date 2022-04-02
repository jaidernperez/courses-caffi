import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {TemplateUseCase} from '../../../../domain/usecases';
import {Application, NextFunction, Request, Response} from 'express';

@injectable()
export class TemplateController {

    constructor(@inject(Symbol.for('TemplateUseCase')) private templateUseCase: TemplateUseCase) {
    }

    public routes(app: Application): void {
        app.route('/templates').get((req: Request, res: Response, next: NextFunction) => {
            this.templateUseCase.getTemplates().then((templates) => {
                res.status(200).send({templates});
            });
        }).post((req: Request, res: Response, next: NextFunction) => {
            this.templateUseCase.saveTemplate(req.body).then(template => {
                res.status(201).send({template});
            }).catch(reason => {
                next(reason);
            });
        }).put((req: Request, res: Response, next: NextFunction) => {
            this.templateUseCase.updateTemplate(req.body).then(result => {
                res.status(200).send({result});
            }).catch(reason => {
                next(reason);
            });
        });

        app.route('/templates/:id').get((req: Request, res: Response, next: NextFunction) => {
            this.templateUseCase.findTemplateById(Number(req.params.id)).then((template) => {
                res.status(200).send({template});
            }).catch(reason => {
                next(reason);
            });
        });
    }

}