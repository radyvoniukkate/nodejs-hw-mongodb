const { Contact } = require('../models/contact');

const getAllContacts = async (
  userId, 
  page,
  perPage,
  sortBy,
  sortOrder,
  type,
  isFavourite
) => {
  const limit = parseInt(perPage, 10);
  const skip = (page - 1) * limit;

  const filter = { userId };
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
  userId, 
}) => {
  try {
    const newContact = new Contact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
      userId,
    });

    await newContact.save();
    return newContact;
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

const getContactByIdService = async (contactId, userId) => {
  try {
    return await Contact.findOne({ _id: contactId, userId }); 
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    throw error;
  }
};

const updateContact = async (contactId, userId, updateData) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: contactId, userId }, 
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

const deleteContact = async (contactId, userId) => {
  try {
    const deletedContact = await Contact.findOneAndDelete({
      _id: contactId,
      userId,
    }); 
    return deletedContact;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};

module.exports = {
  getAllContacts,
  getContactByIdService,
  createContact,
  updateContact,
  deleteContact,
};
