// src/index.js
const { initMongoConnection } = require('./db/initMongoConnection');
const setupServer = require('./server');

// Встановлення з'єднання з MongoDB перед запуском сервера
initMongoConnection()
  .then(setupServer)
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
