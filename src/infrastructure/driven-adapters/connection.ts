import 'dotenv/config';
import {createConnection} from 'typeorm';
import {SlideData} from './slide/slide.data';

export const connectDB = (): Promise<any> => {
    return createConnection({
        type: 'postgres',
        host: process.env.HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [SlideData],
        synchronize: true,
        ssl: process.env.NODE_ENV === 'production' ? {
            rejectUnauthorized: false
        } : false
    });
};