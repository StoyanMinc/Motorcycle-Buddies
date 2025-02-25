import { Router } from "express";
import { motorcycleService } from "../services/motorcycleService.js";
import fs from 'fs';
import path from 'path';

const motorcycleController = Router();

motorcycleController.get('/', async (req, res) => {
    const motorcycles = await motorcycleService.getAll();
    res.json(motorcycles);
})

motorcycleController.get('/lasts', async (req, res) => {
    const lastMotorycles = await motorcycleService.getLasts();
    res.json(lastMotorycles);
});

motorcycleController.get('/:motorcycleId', async (req, res) => {
    const { motorcycleId } = req.params;
    const motorcycle = await motorcycleService.getOne(motorcycleId);
    res.json(motorcycle);
});

motorcycleController.post('/', async (req, res) => {
    const motorcycleData = req.body;
    const buffer = Buffer.from(motorcycleData.image, "base64");
    let filePath = `uploadsImages/${Date.now()}.${motorcycleData.imageType}`; // Adjust extension as needed
    fs.writeFileSync(path.join(import.meta.dirname, "../..", filePath), buffer);
    motorcycleData.image = filePath;
    console.log(motorcycleData.image);
    const motorcycle = await motorcycleService.create(motorcycleData);
    res.json(motorcycle);
});

export default motorcycleController;