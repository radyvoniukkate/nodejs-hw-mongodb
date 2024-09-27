const Contact = require('../models/contact'); // Імпортуємо модель

const getAllContacts = async () => {
  return await Contact.find(); // Повертаємо всі контакти
};

// Сервіс для отримання контакту за ID
const getContactByIdService = async (contactId) => {
  return await Contact.findById(contactId); // Знаходимо контакт за ID
};

module.exports = {
  getAllContacts,
  getContactByIdService,
};
