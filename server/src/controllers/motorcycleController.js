import { Router } from "express";
import { motorcycleService } from "../services/motorcycleService.js";

const motorcycleController = Router();

motorcycleController.get('/', async (req, res) => {
    const motorcycles = await motorcycleService.getAll();
    res.json(motorcycles);
})

motorcycleController.get('/lasts', async (req, res) => {
    const lastMotorycles = await motorcycleService.getLasts();
    res.json(lastMotorycles);
});

motorcycleController.get('/:motorcycleId',async (req, res) => {
    const { motorcycleId } = req.params;
    const motorcycle = await motorcycleService.getOne(motorcycleId);
    res.json(motorcycle);
});

motorcycleController.post('/', async (req, res) => {
    const motorcycleData = req.body;
    console.log(motorcycleData)
    const motorcycle = await motorcycleService.create(motorcycleData);
    res.json(motorcycle);
});



export default motorcycleController;