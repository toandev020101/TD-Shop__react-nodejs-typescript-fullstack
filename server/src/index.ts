import { createConnection } from 'typeorm';
import { User } from './entities/user';
import dotenv from 'dotenv';
import 'reflect-metadata';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import cors from 'cors';

const main = async () => {
    dotenv.config();

    await createConnection({
        type: 'postgres',
        database: 'TDShop',
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        logging: true,
        synchronize: true,
        entities: [User],
    });

    const app = express();

    app.use(cors());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));

    // app.use('/api/v1', require('./routes'));

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`SERVER STARTED ON http://localhost:${PORT}`));
};

main().catch((err) => console.log('ERROR STARTING SERVER: ', err));
