import { Router } from 'express';
import {
  findUsers,
  findUserById,
  updateUserProfile,
  updateUserAvatar,
  findCurrentUser,
} from '../controllers/users.js';
import { celebrateParamsRouteMe, celebrateBodyProfile, celebrateBodyAvatar } from '../validators/users.js';

export const userRoutes = Router();

userRoutes.get('/users', findUsers);
userRoutes.patch('/users/me', celebrateBodyProfile, updateUserProfile);
userRoutes.get('/users/me', findCurrentUser);
userRoutes.patch('/users/me/avatar', celebrateBodyAvatar, updateUserAvatar);
userRoutes.get('/users/:id', celebrateParamsRouteMe, findUserById);
