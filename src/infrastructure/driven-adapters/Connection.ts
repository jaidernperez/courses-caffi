import 'dotenv/config';
import {createConnection} from "typeorm";
import {SlideData} from "./slide/SlideData";

export const connectDB = (): Promise<any> => {
    return createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "postgres",
        database: "db_courses",
        entities: [SlideData],
        synchronize: true
    });
}