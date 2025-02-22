import { Router } from "express";
import { userService } from "../services/userService.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    const formData = req.body;
    try {
        const userData = await userService.register(formData);
        res.json(userData);
        
    } catch (error) {
        if(error.message === 'Username already exist!') {
            return res.status(409).json({message: error.message});
        }
        res.status(500).res.json({ message: 'Internal server error'});
    }
});

authController.post('/login', async (req, res) => {
    const formData = req.body;
    try {
        const userData = await userService.login(formData);
        res.json(userData);

    } catch (error) {
        if (error.message === 'Invalid Username or Password!') {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).res.json({ message: 'Internal server error'});
    }
})

authController.get('/logout', (req, res) => {
    res.json({ ok: true });
});

export default authController;