const { Dexie } = require('dexie');

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

const getCurrentBook = async () => {
  const book = await booksDb.books.where('name')
    .equalsIgnoreCase('Some Book')
    .toArray();
  return book[0];
};

// remove book
// add install updates button

module.exports = { addBook, getCurrentBook };
