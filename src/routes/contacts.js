const express = require('express');
const router = express.Router();
const {
  getContacts,
  getContactById,
} = require('../controllers/contactsController');

// Маршрут для отримання всіх контактів
router.get('/', getContacts);

// Новий маршрут для отримання контакту за ID
router.get('/:contactId', getContactById);

module.exports = router;
