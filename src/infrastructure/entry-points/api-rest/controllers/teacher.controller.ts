import 'reflect-metadata';
import {inject, injectable} from 'inversify';
import {TeacherUseCase} from '../../../../domain/usecases';
import {Application, NextFunction, Request, Response} from 'express';

@injectable()
export class TeacherController {

    constructor(@inject(Symbol.for('TeacherUseCase')) private teacherUseCase: TeacherUseCase) {
    }

    public routes(app: Application): void {
        app.route('/teachers').get((req: Request, res: Response, next: NextFunction) => {
            this.teacherUseCase.getTeachers().then((teachers) => {
                res.status(200).send({teachers});
            });
        }).post((req: Request, res: Response, next: NextFunction) => {
            this.teacherUseCase.saveTeacher(req.body).then(teacher => {
                res.status(201).send({teacher});
            }).catch(reason => {
                next(reason);
            });
        }).put((req: Request, res: Response, next: NextFunction) => {
            this.teacherUseCase.updateTeacher(req.body).then(result => {
                res.status(200).send({result});
            }).catch(reason => {
                next(reason);
            });
        });

        app.route('/teachers/:id').get((req: Request, res: Response, next: NextFunction) => {
            this.teacherUseCase.findTeacherById(Number(req.params.id)).then((teacher) => {
                res.status(200).send({teacher});
            }).catch(reason => {
                next(reason);
            });
        }).delete((req: Request, res: Response, next: NextFunction) => {
            this.teacherUseCase.deleteTeacher(Number(req.params.id)).then(result => {
                res.status(200).send({result});
            }).catch(reason => {
                next(reason);
            });
        });
    }

}