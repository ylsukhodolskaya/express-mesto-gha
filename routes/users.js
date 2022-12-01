import { Router } from 'express';
import {
  findUsers,
  findUserById,
  updateUserProfile,
  updateUserAvatar,
  findCurrentUser,
} from '../controllers/users.js';
import { celebrateParamsRouteId, celebrateBodyProfile, celebrateBodyAvatar } from '../validators/users.js';

export const userRoutes = Router();

userRoutes.get('/', findUsers);
userRoutes.patch('/me', celebrateBodyProfile, updateUserProfile);
userRoutes.get('/me', findCurrentUser);
userRoutes.patch('/me/avatar', celebrateBodyAvatar, updateUserAvatar);
userRoutes.get('/:id', celebrateParamsRouteId, findUserById);
