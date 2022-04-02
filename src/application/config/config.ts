import 'reflect-metadata';
import {Container} from 'inversify';

import {
    Server,
    SlideController,
    TeacherController,
    TemplateController
} from '../../infrastructure/entry-points/api-rest';
import {SlideUseCase, TeacherUseCase, TemplateUseCase} from '../../domain/usecases';
import {
    SlideAdapter,
    SlideDataMapper,
    SlideDataMapperImpl,
    TeacherAdapter,
    TeacherDataMapper,
    TeacherDataMapperImpl,
    TemplateAdapter,
    TemplateDataMapper,
    TemplateDataMapperImpl
} from '../../infrastructure/driven-adapters';
import {SlideRepository, TeacherRepository, TemplateRepository} from '../../domain/models';
import {
    SlideDomainMapper,
    SlideDomainMapperImpl,
    TeacherDomainMapper,
    TeacherDomainMapperImpl,
    TemplateDomainMapper,
    TemplateDomainMapperImpl
} from '../../domain/mappers';

const container = new Container();

container.bind<TemplateDomainMapper>(Symbol.for('TemplateDomainMapper')).to(TemplateDomainMapperImpl).inSingletonScope();
container.bind<TemplateDataMapper>(Symbol.for('TemplateDataMapper')).to(TemplateDataMapperImpl).inSingletonScope();
container.bind<TemplateRepository>(Symbol.for('TemplateRepository')).to(TemplateAdapter).inSingletonScope();
container.bind<TemplateUseCase>(Symbol.for('TemplateUseCase')).to(TemplateUseCase).inSingletonScope();
container.bind<TemplateController>(Symbol.for('TemplateController')).to(TemplateController).inSingletonScope();

container.bind<TeacherDomainMapper>(Symbol.for('TeacherDomainMapper')).to(TeacherDomainMapperImpl).inSingletonScope();
container.bind<TeacherDataMapper>(Symbol.for('TeacherDataMapper')).to(TeacherDataMapperImpl).inSingletonScope();
container.bind<TeacherRepository>(Symbol.for('TeacherRepository')).to(TeacherAdapter).inSingletonScope();
container.bind<TeacherUseCase>(Symbol.for('TeacherUseCase')).to(TeacherUseCase).inSingletonScope();
container.bind<TeacherController>(Symbol.for('TeacherController')).to(TeacherController).inSingletonScope();

container.bind<SlideDataMapper>(Symbol.for('SlideDataMapper')).to(SlideDataMapperImpl).inSingletonScope();
container.bind<SlideDomainMapper>(Symbol.for('SlideDomainMapper')).to(SlideDomainMapperImpl).inSingletonScope();
container.bind<SlideRepository>(Symbol.for('SlideRepository')).to(SlideAdapter).inSingletonScope();
container.bind<SlideUseCase>(Symbol.for('SlideUseCase')).to(SlideUseCase).inSingletonScope();
container.bind<SlideController>(Symbol.for('SlideController')).to(SlideController).inSingletonScope();

container.bind<Server>(Symbol.for('Server')).to(Server).inSingletonScope();

export {container};
