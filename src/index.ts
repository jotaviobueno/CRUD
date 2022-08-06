import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {router} from './app/routes/v1';

const app = express();

dotenv.config();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/', router)

mongoose.connect(`${process.env.DB}`).then(() => {
    console.log('connected to mongoose');

    app.listen(8081, () => {
        console.log('listening on!');
    });
}).catch (error => {
    console.log(error);
});
