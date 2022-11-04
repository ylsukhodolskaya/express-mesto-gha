import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import process from 'process';
import { constants } from 'http2';
import { userRoutes } from './routes/users.js';
import { cardRoutes } from './routes/cards.js';

const app = express();

const { PORT = 3000 } = process.env;

mongoose.set({ runValidators: true });
mongoose.connect('mongodb://localhost:27017/mestodb'); // подключаемся к базе данных

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use((req, res, next) => {
  req.user = { _id: '636544c2d1821e9e0b7312c7' };
  next();
});

// Вызываем роутинг пользователя
app.use('/', userRoutes);

// Роутинг карточек
app.use('/', cardRoutes);

// Обработка нееправильного пути
app.all('/*', (req, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Такой страницы не существует =(' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
