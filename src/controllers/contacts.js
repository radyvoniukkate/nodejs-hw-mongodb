const {
  getAllContacts,
  getContactByIdService,
  createContact: createNewContact,
  updateContact: updContact,
  deleteContact: dltContact,
} = require('../services/contacts');
const httpErrors = require('http-errors');
const uploadPhoto = require('../middlewares/upload'); 

const getContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type,
    isFavourite,
  } = req.query;

  const userId = req.user._id;

  try {
    const contacts = await getAllContacts(
      userId,
      page,
      perPage,
      sortBy,
      sortOrder,
      type,
      isFavourite
    );
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: 'Error fetching contacts.',
      error: error.message,
    });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const contact = await getContactByIdService(contactId, userId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data: null,
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

const createContact = [
  async (req, res, next) => {
    try {
      const { name, phoneNumber, email, isFavourite, contactType } = req.body;

      const userId = req.user ? req.user._id : null;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      console.log('Received request:', req.body);
      console.log(req.file); 
      const isFavouriteBool = isFavourite === 'true';

      const photoUrl = req.file ? req.file.path : null; 
      const newContact = await createNewContact({
        name,
        phoneNumber,
        email,
        isFavourite: isFavouriteBool,
        contactType,
        photo: photoUrl,
        userId,
      });

      res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: newContact,
      });
    } catch (error) {
      next(error);
    }
  },
];

const updateContact = [
  uploadPhoto, 
  async (req, res, next) => {
    const { contactId } = req.params; 
    const userId = req.user._id; 
    const updateData = req.body; 

    try {
      if (req.file) {
        const photoUrl = req.file.path; 
        updateData.photo = photoUrl; 
      }

      const updatedContact = await updContact(contactId, userId, updateData);

      res.status(200).json({
        status: 200,
        message: 'Successfully updated the contact!',
        data: updatedContact,
      });
    } catch (error) {
      next(error); 
    }
  },
];



const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const userId = req.user._id;

  try {
    const deletedContact = await dltContact(contactId, userId);

    if (!deletedContact) {
      throw httpErrors(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};
