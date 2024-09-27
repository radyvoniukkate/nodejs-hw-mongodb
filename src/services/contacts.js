const Contact = require('../models/contact'); 

const getAllContacts = async () => {
  return await Contact.find(); 
};


const getContactByIdService = async (contactId) => {
  return await Contact.findById(contactId); 
};

module.exports = {
  getAllContacts,
  getContactByIdService,
};
