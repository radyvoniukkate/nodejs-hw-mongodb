const { Contact } = require('../models/contact'); 

const getAllContacts = async (
  page,
  perPage,
  sortBy,
  sortOrder,
  type,
  isFavourite
) => {
  const limit = parseInt(perPage, 10);
  const skip = (page - 1) * limit;

  const filter = {};
  if (type) {
    filter.contactType = type; 
  }
  if (isFavourite) {
    filter.isFavourite = isFavourite === 'true'; 
  }

  const totalItems = await Contact.countDocuments(filter); 

  const contacts = await Contact.find(filter)
    .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 }) 
    .skip(skip) 
    .limit(limit);

  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: contacts,
    page: parseInt(page, 10),
    perPage: limit,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};


const createContact = async ({
  name,
  phoneNumber,
  email,
  isFavourite,
  contactType,
}) => {
  try {
    const newContact = new Contact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    await newContact.save();
    return newContact;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

const getContactByIdService = async (contactId) => {
  try {
    return await Contact.findById(contactId);
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    throw error;
  }
};

const updateContact = async (contactId, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true }
    );

    if (!updatedContact) {
      throw new Error('Contact not found');
    }

    return updatedContact;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

const deleteContact = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};

module.exports = {
  getAllContacts,
  getContactByIdService,
  createContact,
  updateContact,
  deleteContact,
};
