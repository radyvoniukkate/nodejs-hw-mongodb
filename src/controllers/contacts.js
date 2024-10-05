const {
  getAllContacts,
  getContactByIdService,
  createContact: createNewContact,
    updateContact: updContact,
  deleteContact:dltContact
} = require('../services/contacts');
const httpErrors = require('http-errors');


const getContacts = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = 'name',
    sortOrder = 'asc',
    type, 
    isFavourite,
  } = req.query;

  try {
    const contacts = await getAllContacts(
      page,
      perPage,
      sortBy,
      sortOrder,
      type,
      isFavourite
    );
    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error fetching contacts.",
      error: error.message,
    });
  }
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactByIdService(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
        data:null,
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

const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    const newContact = await createNewContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updateData = req.body;

  try {
    const updatedContact = await updContact(contactId, updateData);

    if (!updatedContact) {
      throw httpErrors(404, 'Contact not found'); 
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await dltContact(contactId); 

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
  deleteContact
};
