import "reflect-metadata";
import {Container} from "inversify";

import {SlideController, Server} from "../../infrastructure/entry-points/api-rest";
import {SlideUseCase} from "../../domain/usecases";

const container = new Container();

container.bind<SlideUseCase>(Symbol.for("SlideUseCase")).to(SlideUseCase).inSingletonScope();
container.bind<SlideController>(Symbol.for("SlideController")).to(SlideController).inSingletonScope();
container.bind<Server>(Symbol.for("Server")).to(Server).inSingletonScope();

export {container}
