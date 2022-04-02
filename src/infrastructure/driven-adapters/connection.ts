import 'dotenv/config';
import {createConnection} from 'typeorm';
import {SlideData} from './slide/slide.data';
import {TeacherData} from './teacher/teacher.data';
import {TemplateData} from './template/template.data';

export const connectDB = (): Promise<any> => {
    return createConnection({
        type: 'postgres',
        host: process.env.HOST,
        port: Number(process.env.DATABASE_PORT),
        username: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        entities: [SlideData, TeacherData, TemplateData],
        synchronize: true,
        ssl: process.env.NODE_ENV === 'production' ? {
            rejectUnauthorized: false
        } : false
    });
};