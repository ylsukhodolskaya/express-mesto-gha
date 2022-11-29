import { Router } from 'express';
import {
  findUsers,
  findUserById,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users.js';

export const userRoutes = Router();

userRoutes.get('/users', findUsers);
userRoutes.get('/users/:id', findUserById);
userRoutes.patch('/users/me', updateUserProfile);
userRoutes.patch('/users/me/avatar', updateUserAvatar);
