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

const router = express.Router();

router.use(authenticate);

router.get('/', getContacts);
router.get('/:contactId', isValidId, getContactById);
router.post('/', validateBody(contactCreationSchema), createContact);
router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactUpdateSchema),
  updateContact
);
router.delete('/:contactId', isValidId, deleteContact);

module.exports = router;
