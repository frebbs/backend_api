import express from 'express';
const router = express.Router();
import userController from "../controllers/userController.js";

router.post('/login',userController.POST.login);

router.post('/register', userController.POST.register);

router.get('/protected', userController.GET.protected);

export default router