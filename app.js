import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import process from 'process';
import dotenv from 'dotenv';
import { constants } from 'http2';
import path from 'path';
import { errors } from 'celebrate';
import { userRoutes } from './routes/users.js';
import { cardRoutes } from './routes/cards.js';
import { authRouter } from './routes/auth.js';
import { auth } from './middlewares/auth.js';
import { NotFoundError } from './errors/NotFoundError.js';

const config = dotenv.config({
  path: path
    .resolve(process.env.NODE_ENV === 'production' ? '.env' : '.env.common'),
})
  .parsed;

const app = express();
app.set('config', config);

const { PORT = 3000 } = process.env;

mongoose.set({ runValidators: true });
mongoose.connect('mongodb://localhost:27017/mestodb'); // подключаемся к базе данных
app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// Роутинг авторизации
app.use('/', authRouter);

app.use(auth);

// Вызываем роутинг пользователя
app.use('/users', userRoutes);

// Роутинг карточек
app.use('/cards', cardRoutes);

// Обработка нееправильного пути
app.all('/*', (req, res, next) => {
  next(new NotFoundError('Такой страницы не существует'));
});

app.use(errors());

app.use((err, req, res, next) => {
  const status = err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;
  const message = err.message || 'Неизвестная ошибка';
  res.status(status).send({ message });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
