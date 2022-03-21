import 'dotenv/config';
import {container} from './config/config';
import {Server} from '../infrastructure/entry-points/api-rest';
import {connectDB} from '../infrastructure/driven-adapters';
import Logger from '../domain/helpers/logger';

const PORT = Number(process.env.PORT) || 3000;

const bootstrap = async () => {
    await connectDB();
    return container.get<Server>(Symbol.for('Server'));
};

bootstrap().then(server => {
    Logger.info(`Server is listening on localhost:${PORT}, open your browser on http://localhost:${PORT}/`);
    server.start(PORT);
}).catch(reason => Logger.error(reason));
