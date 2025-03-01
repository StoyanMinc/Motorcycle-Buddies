import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './router.js';
import bodyParser from 'body-parser';
import path from 'path';


const app = express();

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/motorcycles');
    console.log('Connect to DB!');
} catch (error) {   
    console.log(error.message);
}

const uploadDir = path.join(import.meta.dirname, '../uploadsImages');
const uploadUserDir = path.join(import.meta.dirname, '../uploadsUserImages');
app.use('/uploadsImages', express.static(uploadDir));
app.use('/uploadsUserImages', express.static(uploadUserDir));

app.use(cors());
// app.use(json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(router);

app.get('/', (req, res) => {
    res.send('hello')
})
app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));


