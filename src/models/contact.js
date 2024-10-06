const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose схема для моделі Contact
const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, minlength: 3, maxlength: 20 },
    phoneNumber: { type: String, required: true, minlength: 3, maxlength: 20 },
    email: { type: String, default: null },
    isFavourite: { type: Boolean, default: false },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
      required: true,
    },
  },
  {
    timestamps: true, // Додає поля createdAt та updatedAt
    versionKey: false, // Прибирає поле __v
  }
);

// Joi схема для створення нового контакту
const contactCreationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .default('personal')
    .required(),
});

// Joi схема для оновлення контакту
const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().email().allow(null),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal'),
});

// Модель Mongoose для колекції Contact
const Contact = mongoose.model('Contact', contactSchema);

// Експортуємо моделі та схеми
module.exports = {
  Contact,
  contactCreationSchema,
  contactUpdateSchema,
};
