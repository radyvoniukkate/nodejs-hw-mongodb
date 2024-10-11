const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();
const contactsRouter = require('./routes/contacts');
const authRouter = require('./routes/auth');
const notFoundHandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('../src/middlewares/swagger');
const path = require('path')

const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  
  app.use('/swagger', express.static(path.join(__dirname, '../swagger/')))
  
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
  app.use(bodyParser.text({ type: '/' }));
  app.use(cors());
  app.use(pino);
  app.use(express.json());
app.use(cookieParser());
  app.use('/contacts', contactsRouter);

  app.use('/auth', authRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = setupServer;
