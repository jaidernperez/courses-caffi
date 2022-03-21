import 'reflect-metadata';
import {Container} from 'inversify';

import {Server, SlideController} from '../../infrastructure/entry-points/api-rest';
import {SlideUseCase} from '../../domain/usecases';
import {SlideAdapter, SlideMapperData, SlideMapperDataImpl} from '../../infrastructure/driven-adapters';
import {SlideRepository} from '../../domain/models';
import {SlideMapperDomain, SlideMapperDomainImpl} from '../../domain/mappers';

const container = new Container();

container.bind<SlideMapperData>(Symbol.for('SlideMapperData')).to(SlideMapperDataImpl).inSingletonScope();
container.bind<SlideMapperDomain>(Symbol.for('SlideMapperDomain')).to(SlideMapperDomainImpl).inSingletonScope();
container.bind<SlideRepository>(Symbol.for('SlideRepository')).to(SlideAdapter).inSingletonScope();
container.bind<SlideUseCase>(Symbol.for('SlideUseCase')).to(SlideUseCase).inSingletonScope();
container.bind<SlideController>(Symbol.for('SlideController')).to(SlideController).inSingletonScope();
container.bind<Server>(Symbol.for('Server')).to(Server).inSingletonScope();

export {container};
