import { Router } from "express";
import fs from 'fs';

import { userService } from "../services/userService.js";
import path from "path";

const authController = Router();

authController.post('/register', async (req, res) => {
    const formData = req.body;
    try {
        const userData = await userService.register(formData);
        res.json(userData);

    } catch (error) {
        if (error.message === 'Username already exist!') {
            return res.status(401).json({ message: error.message });
        } else if(error.message === 'Password must be at least 6 characters long!') {
            return res.status(400).json({message: error.message});
        } else if(error.message === 'Username must be at least 4 characters long!') {
            return res.status(400).json({message: error.message});
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

authController.put('/:userId/update-user', async (req, res) => {
    const { userId } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await userService.changeUserData(userId, userData);
        res.json(updatedUser)
    } catch (error) {
        console.log(error.message);
    }
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
    const { userId, image, imageType } = req.body;
    const userData = await userService.getUser(userId);

    const buffer = Buffer.from(image, 'base64');
    if (userData.image) {

        const oldImagePath = path.join(import.meta.dirname, '../..', userData.image);
        if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
        }
    }

    const newFilePath = `uploadsUserImages/${Date.now()}.${imageType}`;
    fs.writeFileSync(path.join(import.meta.dirname, '../..', newFilePath), buffer);
    const user = await userService.changeImage(userId, newFilePath);
    res.json(user);
});

authController.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const userData = await userService.getUser(userId);
        res.json(userData)
    } catch (error) {
        console.log(error.message);
    }
});


export default authController;