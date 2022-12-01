import { Router } from 'express';
import {
  createCard,
  findCards,
  deleteCard,
  likeCard,
  dislikeCard,
} from '../controllers/cards.js';
import { celebrateBodyCard, celebrateParamsRouteId } from '../validators/cards.js';

export const cardRoutes = Router();

cardRoutes.post('/cards', celebrateBodyCard, createCard);
cardRoutes.get('/cards', findCards);
cardRoutes.delete('/cards/:id', celebrateParamsRouteId, deleteCard);
cardRoutes.put('/cards/:cardId/likes', celebrateParamsRouteId, likeCard);
cardRoutes.delete('/cards/:cardId/likes', celebrateParamsRouteId, dislikeCard);
