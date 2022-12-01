// import { constants } from 'http2';
import { Card } from '../models/card.js';
import { BadRequestError, NotFoundError } from '../errors/index.js';

// POST-запрос для создания новой карточки
export const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

// GET-запрос для загрузки всех карточек
export const findCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      // res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
      // .send({ message: 'Произошла ошибка загрузки карточек с сервера' });
      next(err);
    });
};

// DELETE-запрос на удаление карточки по id
export const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        // res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

// PUT-запрос постановки лайка
export const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};

// DELETE-запрос удаления лайка
export const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // удалить _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        throw new NotFoundError('Карточка не найдена');
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(`Введены некорректные данные ${err.message}`));
      } else {
        next(err);
      }
    });
};
