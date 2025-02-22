import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import router from './router.js';

const app = express();

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/motorcycles');
    console.log('Connect to DB!');
} catch (error) {   
    console.log(error.message);
}

app.use(cors());
app.use(json());
app.use(router);

app.listen(3000, () => console.log('Server is listening on http://localhost:3000...'));


