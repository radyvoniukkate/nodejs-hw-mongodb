const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      default: null, // Можна задати значення за замовчуванням
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true }
); // Автоматично додати createdAt та updatedAt

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
