import { Router } from 'express';
import {
  createUser,
  findUsers,
  // findUserById,
  // updateUserProfile,
  // updateUserAvatar,
} from '../controllers/users.js';

export const userRoutes = Router();

userRoutes.post('/users', createUser);
userRoutes.get('/users', findUsers);
// userRoutes.get('/users/:id', findUserById);
// userRoutes.patch('/users/me', updateUserProfile);
// userRoutes.patch('/users/me/avatar', updateUserAvatar);
