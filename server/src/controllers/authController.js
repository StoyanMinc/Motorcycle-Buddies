import { Router } from "express";
import { userService } from "../services/userService.js";

const authController = Router();

authController.post('/register', async (req, res) => {
    const formData = req.body;
    try {
        const userData = await userService.register(formData);
        res.json(userData);

    } catch (error) {
        if (error.message === 'Username already exist!') {
            return res.status(409).json({ message: error.message });
        }
        res.status(500).res.json({ message: 'Internal server error' });
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
        res.status(500).res.json({ message: 'Internal server error' });
    }
})

authController.get('/logout', (req, res) => {
    res.json({ ok: true });
});

authController.put('/change-password', async (req, res) => {
    const values = req.body;
    try {
        const result = await userService.changePassword(values);
        res.json({ message: result });
    } catch (error) {
        if (error.message === 'Old password is invalid!') {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).res.json({ message: 'Internal server error' });
    }
});

authController.put('/change-image', async (req, res) => {
    const {userId, image, imageType} = req.body;
    res.json({message: 'image send!'});
});


export default authController;