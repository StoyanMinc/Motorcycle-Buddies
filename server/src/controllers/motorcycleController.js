import { Router } from "express";
import { motorcycleService } from "../services/motorcycleService.js";

const motorcycleController = Router();

motorcycleController.post('/', async (req, res) => {
    const motorcycleData = req.body;
    console.log(motorcycleData)
    const motorcycle = await motorcycleService.create(motorcycleData);
    res.json(motorcycle);
});

export default motorcycleController;