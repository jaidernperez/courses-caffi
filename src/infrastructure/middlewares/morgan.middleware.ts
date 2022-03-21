import * as morgan from 'morgan';
import {StreamOptions} from 'morgan';
import Logger from '../../domain/helpers/logger';

const stream: StreamOptions = {
    write: (message) => Logger.http(message.substring(0, message.lastIndexOf('\n'))),
};

const skip = () => {
    const env = process.env.NODE_ENV || 'development';
    return env !== 'development';
};

const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    {stream, skip}
);

export default morganMiddleware;