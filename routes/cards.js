import { Router } from 'express';
import {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
  findCardById,
} from '../controllers/cards.js';
import { celebrateBodyCard, celebrateParamsRouteId } from '../validators/cards.js';

export const cardRoutes = Router();

cardRoutes.post('/cards', celebrateBodyCard, createCard);
cardRoutes.get('/cards', findCards);
cardRoutes.get('/cards/:id', findCardById);
cardRoutes.delete('/cards/:id', celebrateParamsRouteId, deleteCard);
cardRoutes.put('/cards/:id/likes', celebrateParamsRouteId, likeCard);
cardRoutes.delete('/cards/:id/likes', celebrateParamsRouteId, dislikeCard);
