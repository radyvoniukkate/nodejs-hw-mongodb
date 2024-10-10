const express = require('express');
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contacts');
const { validateBody, isValidId } = require('../middlewares/validation');
const {
  contactCreationSchema,
  contactUpdateSchema,
} = require('../models/contact');
const authenticate = require('../middlewares/authenticate');
const uploadPhoto = require('../middlewares/upload');

const router = express.Router();

router.use(authenticate);

router.get('/', getContacts);

router.get('/:contactId', isValidId, getContactById);

router.post(
  '/',
  uploadPhoto, 
  validateBody(contactCreationSchema), 
  createContact 
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  updateContact
);
router.delete('/:contactId', isValidId, deleteContact);

module.exports = router;
