
const { initMongoConnection } = require('./db/initMongoConnection');
const setupServer = require('./server');


initMongoConnection()
  .then(setupServer)
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
