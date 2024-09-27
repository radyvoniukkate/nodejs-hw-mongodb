const {
  getAllContacts,
  getContactByIdService,
} = require('../services/contacts'); // Імпортуємо сервіс

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    return res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return res.status(500).json({
      status: 500,
      message: 'Error fetching contacts.',
      error: error.message,
    });
  }
};

// Контролер для отримання контакту за ID
const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactByIdService(contactId);

    if (!contact) {
      return res.status(404).json({
        message: 'Contact not found',
      });
    }

    return res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    return res.status(500).json({
      status: 500,
      message: 'Error fetching contact.',
      error: error.message,
    });
  }
};

module.exports = {
  getContacts,
  getContactById,
};
