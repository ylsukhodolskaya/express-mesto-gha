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

// export const __dirname = path.dirname(fileURLToPath(import.meta.url));

// export const run = async (envName) => {
//   process.on('unhandledRejection', (err) => {
//     console.error(err);
//     process.exit(1);
//   });

//   const config = dotenv.config({ path: path.resolve(__dirname, '.env.common') }).parsed;
//   if (!config) {
//     throw new Error('Config not found');
//   }
//   config.NODE_ENV = envName;
// };
// dotenv.config();
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
app.use('/', userRoutes);

// Роутинг карточек
app.use('/', cardRoutes);

// Обработка нееправильного пути
app.all('/*', (req, res) => {
  res.status(constants.HTTP_STATUS_NOT_FOUND).send({ message: 'Такой страницы не существует =(' });
});

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode || constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: err.message || 'Неизвестная ошибка' });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
