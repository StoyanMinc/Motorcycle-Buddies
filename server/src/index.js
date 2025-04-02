import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import https from 'https';
import fs from 'fs';

import router from './router.js';
const configuration = process.argv[2];
const app = express();

try {
    await mongoose.connect('mongodb://127.0.0.1:27017/motorcycles');
    console.log('Connect to DB!');
} catch (error) {   
    console.log(error.message);
}

const uploadDir = path.join(import.meta.dirname, '../../uploadsImages');
const uploadUserDir = path.join(import.meta.dirname, '../../uploadsUserImages');
app.use('/uploadsImages', express.static(uploadDir));
app.use('/uploadsUserImages', express.static(uploadUserDir));

app.use(cors());
// app.use(json());
app.use(bodyParser.json({limit: '50mb'}));
app.use(router);

app.get('/', (req, res) => {
    res.send('hello')
})

app.get("/uploadsImages/*", (req, res) => {
    res.sendFile(path.join(import.meta.dirname, req.path));
})
app.get("/uploadsUserImages/*", (req, res) => {
    res.sendFile(path.join(import.meta.dirname, req.path));
})
if(configuration == "debug") {
    app.listen(3000, () =>{
        console.log("DEVELOPMENT Server is listening on http://localhost:3000...'");
    })
} else {
    https.createServer({
        cert: fs.readFileSync("/etc/letsencrypt/live/motorcycle-buddies.live/cert.pem"),
        key: fs.readFileSync("/etc/letsencrypt/live/motorcycle-buddies.live/privkey.pem")
    }, app).listen(3000, () => console.log('Server is listening on https://localhost:3000...'));
}