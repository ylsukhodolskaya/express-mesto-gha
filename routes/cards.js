import { Router } from 'express';
import {
  createCard, findCards,
} from '../controllers/cards.js';

export const cardRoutes = Router();

cardRoutes.post('/cards', createCard);
cardRoutes.get('/cards', findCards);
