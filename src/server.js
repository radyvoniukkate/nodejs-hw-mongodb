const express = require('express');
const cors = require('cors');
const pino = require('pino-http')();
const {
  getContacts,
  getContactById,
} = require('./controllers/contactsController'); 
const contactsRouter = require('./routes/contacts');

const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(pino);
  app.use(express.json());

  app.use('/contacts', contactsRouter);

  
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

module.exports = setupServer;
