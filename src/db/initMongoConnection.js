// src/db/initMongoConnection.js
const mongoose = require('mongoose');
require('dotenv').config(); // Завантажуємо змінні оточення з .env

const initMongoConnection = async () => {
  try {
    const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
      process.env;
    const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

    await mongoose.connect(mongoUri);
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error; // Пробрасываем ошибку, чтобы обработать в index.js
  }
};

module.exports = { initMongoConnection };
