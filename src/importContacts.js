require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const Contact = require('./models/contact');

async function importContacts() {
  const user = process.env.MONGODB_USER;
  const password = process.env.MONGODB_PASSWORD;
  const url = process.env.MONGODB_URL;
  const db = process.env.MONGODB_DB;

  const connectionString = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString);
    console.log('Mongo connection successfully established!');

    // Читання даних з contacts.json
    const contactsData = JSON.parse(fs.readFileSync('contacts.json', 'utf-8'));

    // Імпорт контактів
    await Contact.insertMany(contactsData);
    console.log('Contacts imported successfully!');
  } catch (error) {
    console.error('Error importing contacts:', error);
  } finally {
    mongoose.connection.close();
  }
}

importContacts();
