import {inject, injectable} from 'inversify';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {SlideController} from './controllers/slide.controller';
import {errorResponseMiddleware} from '../../middlewares/error.middleware';
import morganMiddleware from '../../middlewares/morgan.middleware';
import {TeacherController} from './controllers/teacher.controller';
import {TemplateController} from './controllers/template.controller';

@injectable()
export class Server {

    constructor(@inject(Symbol.for('SlideController')) private slideController: SlideController,
                @inject(Symbol.for('TeacherController')) private teacherController: TeacherController,
                @inject(Symbol.for('TemplateController')) private templateController: TemplateController,) {
    }

    public start(port: number): void {
        let app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(morganMiddleware);
        this.slideController.routes(app);
        this.teacherController.routes(app);
        this.templateController.routes(app);
        app.use(errorResponseMiddleware);
        app.listen(port);
    }
}