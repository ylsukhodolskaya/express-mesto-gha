import { Router } from 'express';
import {
  findUsers,
  findUserById,
  updateUserProfile,
  updateUserAvatar,
} from '../controllers/users.js';
import { celebrateParamsRouteMe, celebrateBodyUser, celebrateBodyAvatar } from '../validators/users.js';

export const userRoutes = Router();

userRoutes.get('/users', findUsers);
userRoutes.patch('/users/me', celebrateBodyUser, updateUserProfile);
userRoutes.patch('/users/me/avatar', celebrateBodyAvatar, updateUserAvatar);
userRoutes.get('/users/:id', celebrateParamsRouteMe, findUserById);
