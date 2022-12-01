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
cardRoutes.get('/cards/:cardId', findCardById);
cardRoutes.delete('/cards/:cardId', celebrateParamsRouteId, deleteCard);
cardRoutes.put('/cards/:cardId/likes', celebrateParamsRouteId, likeCard);
cardRoutes.delete('/cards/:cardId/likes', celebrateParamsRouteId, dislikeCard);
