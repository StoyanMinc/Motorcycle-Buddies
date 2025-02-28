import { Router } from "express";
import { motorcycleService } from "../services/motorcycleService.js";
import fs from 'fs';
import path from 'path';
const motorcycleController = Router();


motorcycleController.get('/', async (req, res) => {
    const motorcycles = await motorcycleService.getAll();
    res.json(motorcycles);
});

motorcycleController.get('/search', async (req, res) => {
    const { model, year } = req.query;
    const result = await motorcycleService.getSearched(model, year);
    res.json(result);
});

motorcycleController.get('/lasts', async (req, res) => {
    const lastMotorycles = await motorcycleService.getLasts();
    res.json(lastMotorycles);
});

motorcycleController.get('/:motorcycleId', async (req, res) => {
    const { motorcycleId } = req.params;
    const motorcycle = await motorcycleService.getOne(motorcycleId);
    res.json(motorcycle);
});

motorcycleController.get('/:userId/motorcycles', async (req, res) => {
    const { userId } = req.params;
    const motorcycles = await motorcycleService.getUserMotorcycles(userId);
    res.json(motorcycles);
});

motorcycleController.post('/', async (req, res) => {
    const motorcycleData = req.body;
    const buffer = Buffer.from(motorcycleData.image, "base64");
    let filePath = `uploadsImages/${Date.now()}.${motorcycleData.imageType}`; // Adjust extension as needed
    fs.writeFileSync(path.join(import.meta.dirname, "../..", filePath), buffer);
    motorcycleData.image = filePath;
    const motorcycle = await motorcycleService.create(motorcycleData);
    res.json(motorcycle);
});

motorcycleController.put('/:motorcycleId/edit', async (req, res) => {
    const { motorcycleId } = req.params;
    const motorcycleData = req.body;
    const oldMotorcycleData = await motorcycleService.getOne(motorcycleId);

    if (motorcycleData.image) {
        const buffer = Buffer.from(motorcycleData.image, 'base64');
        if (oldMotorcycleData.image !== '') {

            const oldImagePath = path.join(import.meta.dirname, '../..', oldMotorcycleData.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }
        }

        let newFilePath = `uploadsImages/${Date.now()}.${motorcycleData.imageType}`; // Adjust extension as needed
        fs.writeFileSync(path.join(import.meta.dirname, '../..', newFilePath), buffer);
        motorcycleData.image = newFilePath;
    } else {
        motorcycleData.image = oldMotorcycleData.image;
    }

    const motorcycle = await motorcycleService.edit(motorcycleId, motorcycleData);
    res.json(motorcycle);
});

motorcycleController.get('/:motorcycleId/send-like', async (req, res) => {
    const { motorcycleId } = req.params;
    const userId = req.query.userId;

    const motorcycle = await motorcycleService.sendLike(userId, motorcycleId);
    res.json(motorcycle);
});

motorcycleController.delete('/:motorcycleId/delete', async (req, res) => {
    const { motorcycleId } = req.params;
    await motorcycleService.deleteMotorcycle(motorcycleId);
    res.send({ message: 'Delete Successfully!' })
});

export default motorcycleController;