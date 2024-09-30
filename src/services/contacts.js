const Contact = require('../models/contact');

const getAllContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error; 
  }
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
  deleteContact
};
