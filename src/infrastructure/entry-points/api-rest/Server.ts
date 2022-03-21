import {inject, injectable} from "inversify";
import * as express from "express";
import * as bodyParser from "body-parser";
import {SlideController} from "./controllers/SlideController";
import {errorResponseMiddleware} from "../../middlewares/error.middleware";
import morganMiddleware from "../../middlewares/morgan.middleware";

@injectable()
export class Server {

    constructor(@inject(Symbol.for("SlideController")) private loanController: SlideController) {
    }

    public start(port: number): void {
        let app = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(morganMiddleware);
        this.loanController.routes(app);
        app.use(errorResponseMiddleware);
        app.listen(port);
    }
}