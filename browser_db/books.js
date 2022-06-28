/* eslint-disable quotes */
const { Dexie } = require('dexie');

// Creates a new indexedDb database
const booksDb = new Dexie('booksDatabase');
booksDb.version(1).stores({
  books: '++id, name, text',
});

const addBook = (bookName, bookStr) => {
  booksDb.books.add({
    name: bookName,
    text: bookStr,
  });
};

const getCurrentBook = async (bookName) => {
  const book = await booksDb.books.where("name") // THIS REQUIRES DOUBLE QUOTES
    .equalsIgnoreCase(bookName)
    .toArray(); // you have to use toArray or find another dexie method do not leave it off
  return book[0];
};

// remove book

module.exports = { addBook, getCurrentBook };
