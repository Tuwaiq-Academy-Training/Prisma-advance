import express from 'express';
import { getAllUsers, login, register } from '../controller/user.controller';
import validate from '../middleware/validate';
import { loginSchema, registerSchema } from '../zod_schema/user.schema';

const router = express.Router();

// Get all blogs
router.get('/', getAllUsers);
router.post('/login', validate(loginSchema), login);
router.post('/register', validate(registerSchema), register);

export default router;
