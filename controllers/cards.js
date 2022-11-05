import { constants } from 'http2';
import { Card } from '../models/card.js';

// POST-запрос для создания новой карточки
export const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

// GET-запрос для загрузки всех карточек
export const findCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() => {
      res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка загрузки карточек с сервера' });
    });
};

// DELETE-запрос на удаление карточки по id
export const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка удаления карточки с сервера' });
      }
    });
};

// PUT-запрос постановки лайка
export const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};

// DELETE-запрос удаления лайка
export const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // удалить _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Карточка не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(constants.HTTP_STATUS_BAD_REQUEST).send({ message: 'Введены некорректные данные' });
      } else {
        res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Произошла ошибка на сервере' });
      }
    });
};
